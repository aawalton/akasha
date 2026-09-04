import * as resolve from "enhanced-resolve"
import * as fs from "fs"
import * as path from "path"
import picomatch from "picomatch"
import * as ts from "typescript"
import {
  couldNotReadDependency,
  couldNotResolveRequire,
} from "../transpile-diagnostics/transpile-diagnostics.module.code.ts"
import type { ProcessedFile } from "../transpile-emit-file/transpile-emit-file.module.code.ts"
import type { EmitHost } from "../transpile-emit-host/transpile-emit-host.module.code.ts"
import {
  findLuaRequires,
  type LuaRequire,
} from "../transpile-find-lua-requires/transpile-find-lua-requires.module.code.ts"
import type { Plugin } from "../transpile-plugins/transpile-plugins.module.code.ts"
import {
  getEmitPathRelativeToOutDir,
  getProjectRoot,
  getSourceDir,
} from "../transpile-program-paths/transpile-program-paths.module.code.ts"
import {
  fallbackResolve,
  findProgramFileByCanonicalPath,
  isBuildModeLibrary,
  isNodeModulesFile,
  isProjectFile,
  luaRequireToPath,
  removeFileExtension,
  removeTrailingDirectorySeparator,
  shouldIncludeDependency,
  shouldRewriteRequires,
} from "../transpile-resolve-helpers/transpile-resolve-helpers.module.code.ts"
import {
  replaceRequireInCode,
  replaceRequireInSourceMap,
} from "../transpile-resolve-require-replacement/transpile-resolve-require-replacement.module.code.ts"
import type { CompilerOptions } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import { normalizeSlashes } from "../tstl-utils/tstl-utils.module.code.ts"

const resolver = resolve.ResolverFactory.createResolver({
  extensions: [".lua"],
  enforceExtension: true,
  fileSystem: { ...new resolve.CachedInputFileSystem(fs, 0) },
  useSyncFileSystemCalls: true,
  conditionNames: ["require", "node", "tstl", "default"],
  symlinks: false,
})

interface ResolutionResult {
  resolvedFiles: readonly ProcessedFile[]
  diagnostics: readonly ts.Diagnostic[]
}

function createResolutionContext(
  program: ts.Program,
  options: CompilerOptions,
  emitHost: EmitHost,
  plugins: readonly Plugin[]
) {
  const noResolvePaths: picomatch.Matcher[] = (() => {
    const unique = [...new Set(options.noResolvePaths)]
    return unique.map((x) => picomatch(x))
  })()

  const diagnostics: ts.Diagnostic[] = []
  const resolvedFiles = new Map<string, ProcessedFile>()
  const processedDependencies = new Set<string>()
  const pathToFile = new Map<string, string | false>()

  function addAndResolveDependencies(file: ProcessedFile): undefined {
    if (resolvedFiles.has(file.fileName)) return
    resolvedFiles.set(file.fileName, file)

    for (const required of [...findLuaRequires(file.code)].reverse()) {
      if (required.requirePath.startsWith("@NoResolution:")) {
        if (!isBuildModeLibrary(program)) {
          const p = required.requirePath.replace("@NoResolution:", "")
          replaceRequireInCode(file, required, p, options.extension)
          replaceRequireInSourceMap(file, required, p, options.extension)
        }

        continue
      }
      resolveImport(file, required)
    }
  }

  function resolveImport(file: ProcessedFile, required: LuaRequire): undefined {
    if (required.requirePath === "lualib_bundle") {
      resolvedFiles.set("lualib_bundle", { fileName: "lualib_bundle", code: "" })
      return
    }

    if (noResolvePaths.find((isMatch) => isMatch(required.requirePath))) {
      if (options.tstlVerbose) {
        console.log(
          `Skipping module resolution of ${required.requirePath} as it is in the tsconfig noResolvePaths.`
        )
      }
      return
    }

    const dependencyPath =
      resolveDependencyPathsWithPlugins(file, required.requirePath) ??
      resolveDependencyPath(file, required.requirePath)

    if (dependencyPath == null) return couldNotResolveImport(required, file)

    if (options.tstlVerbose === true) {
      console.log(`Resolved ${required.requirePath} to ${normalizeSlashes(dependencyPath)}`)
    }

    processDependency(dependencyPath)
    if (shouldRewriteRequires(dependencyPath, program)) {
      const resolvedRequire = getEmitPathRelativeToOutDir(dependencyPath, program)
      replaceRequireInCode(file, required, resolvedRequire, options.extension)
      replaceRequireInSourceMap(file, required, resolvedRequire, options.extension)
    }
  }

  function resolveDependencyPathsWithPlugins(
    requiringFile: ProcessedFile,
    dependency: string
  ): string | undefined {
    const requiredFromLuaFile = requiringFile.fileName.endsWith(".lua")
    for (const plugin of plugins) {
      if (plugin.moduleResolution != null) {
        const pluginResolvedPath = plugin.moduleResolution(
          dependency,
          requiringFile.fileName,
          options,
          emitHost
        )
        if (pluginResolvedPath !== undefined) {
          if (path.isAbsolute(pluginResolvedPath)) {
            return pluginResolvedPath
          }

          if (requiredFromLuaFile && isNodeModulesFile(requiringFile.fileName)) {
            const resolvedNodeModulesFile = resolveLuaDependencyPathFromNodeModules(
              requiringFile,
              pluginResolvedPath
            )
            if (resolvedNodeModulesFile != null) {
              if (options.tstlVerbose === true) {
                console.log(
                  `Resolved file path for module ${dependency} to path ${pluginResolvedPath} using plugin.`
                )
              }
              return resolvedNodeModulesFile
            }
          }

          const resolvedPath = formatPathToFile(pluginResolvedPath, requiringFile)
          const fileFromPath = getFileFromPath(resolvedPath)

          if (fileFromPath != null) {
            if (options.tstlVerbose === true) {
              console.log(
                `Resolved file path for module ${dependency} to path ${pluginResolvedPath} using plugin.`
              )
            }
            return fileFromPath
          }
        }
      }
    }
  }

  function formatPathToFile(targetPath: string, required: ProcessedFile): string {
    const isRelative = ["/", "./", "../"].some((p) => targetPath.startsWith(p))

    const fileDirectory = path.dirname(required.fileName)
    const relativeTo = isRelative ? fileDirectory : (options.baseUrl ?? fileDirectory)

    const resolvedPath = path.join(relativeTo, targetPath)
    return resolvedPath
  }

  function processDependency(dependencyPath: string): undefined {
    if (processedDependencies.has(dependencyPath)) return
    processedDependencies.add(dependencyPath)

    if (!shouldIncludeDependency(dependencyPath, program)) return

    const dependencyContent = emitHost.readFile(dependencyPath)
    if (dependencyContent === undefined) {
      diagnostics.push(couldNotReadDependency(dependencyPath))
      return
    }

    const dependency = {
      fileName: dependencyPath,
      code: dependencyContent,
    }
    addAndResolveDependencies(dependency)
  }

  function couldNotResolveImport(required: LuaRequire, file: ProcessedFile): undefined {
    const fallbackRequire = fallbackResolve(
      required,
      getSourceDir(program),
      path.dirname(file.fileName)
    )
    replaceRequireInCode(file, required, fallbackRequire, options.extension)
    replaceRequireInSourceMap(file, required, fallbackRequire, options.extension)

    diagnostics.push(
      couldNotResolveRequire(
        required.requirePath,
        path.relative(getProjectRoot(program), file.fileName)
      )
    )
  }

  function resolveDependencyPath(
    requiringFile: ProcessedFile,
    dependency: string
  ): string | undefined {
    const fileDirectory = path.dirname(requiringFile.fileName)
    if (options.tstlVerbose === true) {
      console.log(`Resolving "${dependency}" from ${normalizeSlashes(requiringFile.fileName)}`)
    }

    const requiredFromLuaFile = requiringFile.fileName.endsWith(".lua")
    const dependencyPath = requiredFromLuaFile ? luaRequireToPath(dependency) : dependency

    if (requiredFromLuaFile && isNodeModulesFile(requiringFile.fileName)) {
      const resolvedNodeModulesFile = resolveLuaDependencyPathFromNodeModules(
        requiringFile,
        dependencyPath
      )
      if (resolvedNodeModulesFile != null) return resolvedNodeModulesFile
    }

    const resolvedPath = formatPathToFile(dependencyPath, requiringFile)
    const fileFromPath = getFileFromPath(resolvedPath)
    if (fileFromPath != null) return fileFromPath

    let canonicalProjectFileFallback: string | undefined
    if (!requiredFromLuaFile) {
      const tsResolved = ts.resolveModuleName(
        dependency,
        requiringFile.fileName,
        program.getCompilerOptions(),
        ts.sys
      )
      const tsResolvedFileName = tsResolved.resolvedModule?.resolvedFileName
      if (tsResolvedFileName != null) {
        if (isProjectFile(tsResolvedFileName, program)) {
          return tsResolvedFileName
        }
        canonicalProjectFileFallback = findProgramFileByCanonicalPath(tsResolvedFileName, program)
      }
    }

    if (options.paths != null && options.baseUrl != null) {
      const fileFromPaths = tryGetModuleNameFromPaths(
        dependencyPath,
        options.paths,
        options.baseUrl
      )
      if (fileFromPaths != null) return fileFromPaths
    }

    try {
      const resolveResult = resolver.resolveSync({}, fileDirectory, dependencyPath)
      if (typeof resolveResult === "string" && resolveResult !== "") return resolveResult
    } catch (e: any) {
      if (options.tstlVerbose === true && e.details) {
        console.log(e.details)
      }
    }

    if (canonicalProjectFileFallback != null) {
      console.log(
        `[tstl] Resolved "${dependency}" from ${normalizeSlashes(requiringFile.fileName)} via ` +
          `canonicalization fall-through to ${normalizeSlashes(canonicalProjectFileFallback)} ` +
          `(program exact-string lookup missed the in-program file; path-canonicalization divergence).`
      )
      return canonicalProjectFileFallback
    }

    return undefined
  }

  function resolveLuaDependencyPathFromNodeModules(
    requiringFile: ProcessedFile,
    dependency: string
  ): string | undefined {
    const splitPath = path.normalize(requiringFile.fileName).split(path.sep)
    let packageRootIndex = splitPath.lastIndexOf("node_modules") + 2
    let packageRoot = splitPath.slice(0, packageRootIndex).join(path.sep)

    while (packageRootIndex < splitPath.length) {
      const resolvedPath = path.join(packageRoot, dependency)
      const fileFromPath = getFileFromPath(resolvedPath)
      if (fileFromPath != null) {
        return fileFromPath
      } else {
        const segment = splitPath[packageRootIndex++]
        if (segment === undefined) break
        packageRoot = path.join(packageRoot, segment)
      }
    }

    return undefined
  }

  function getFileFromPath(resolvedPath: string): string | undefined {
    const existingFile = pathToFile.get(resolvedPath)
    if (typeof existingFile === "string") return existingFile
    if (existingFile === false) return undefined

    const file = searchForFileFromPath(resolvedPath)
    pathToFile.set(resolvedPath, file ?? false)
    return file
  }

  function searchForFileFromPath(resolvedPath: string): string | undefined {
    const possibleProjectFiles = [
      resolvedPath,
      resolvedPath + ".ts",
      path.join(resolvedPath, "index.ts"),
      resolvedPath + ".tsx",
      path.join(resolvedPath, "index.tsx"),
    ]

    for (const possibleFile of possibleProjectFiles) {
      if (isProjectFile(possibleFile, program)) {
        return possibleFile
      }
    }

    const possibleLuaProjectFiles = [
      resolvedPath + ".lua",
      path.join(resolvedPath, "index.lua"),
      path.join(resolvedPath, "init.lua"),
    ]

    for (const possibleFile of possibleLuaProjectFiles) {
      if (emitHost.fileExists(possibleFile)) {
        return possibleFile
      }
    }
  }

  function tryGetModuleNameFromPaths(
    relativeToBaseUrl: string,
    paths: ts.MapLike<string[]>,
    baseUrl: string
  ): string | undefined {
    const relativeImport = removeTrailingDirectorySeparator(normalizeSlashes(relativeToBaseUrl))
    for (const [importPattern, targetPatterns] of Object.entries(paths)) {
      const pattern = removeFileExtension(normalizeSlashes(importPattern))
      const indexOfStar = pattern.indexOf("*")
      if (indexOfStar !== -1) {
        const prefix = pattern.substring(0, indexOfStar)
        const suffix = pattern.substring(indexOfStar + 1)
        if (
          (relativeImport.length >= prefix.length + suffix.length &&
            relativeImport.startsWith(prefix) &&
            relativeImport.endsWith(suffix)) ||
          (suffix === "" && relativeImport === removeTrailingDirectorySeparator(prefix))
        ) {
          const matchedStar = relativeImport.substring(
            prefix.length,
            relativeImport.length - suffix.length
          )
          for (const target of targetPatterns) {
            const file = getFileFromPath(path.join(baseUrl, target.replace("*", matchedStar)))
            if (file != null) return file
          }
        }
      } else if (pattern === relativeImport) {
        for (const target of targetPatterns) {
          const file = getFileFromPath(path.join(baseUrl, target))
          if (file != null) return file
        }
      }
    }
  }

  return {
    diagnostics,
    resolvedFiles,
    addAndResolveDependencies,
  }
}

export function resolveDependencies(
  program: ts.Program,
  files: readonly ProcessedFile[],
  emitHost: EmitHost,
  plugins: readonly Plugin[]
): ResolutionResult {
  const options = program.getCompilerOptions()

  const resolutionContext = createResolutionContext(program, options, emitHost, plugins)

  for (const file of files) {
    if (options.tstlVerbose === true) {
      console.log(`Resolving dependencies for ${normalizeSlashes(file.fileName)}`)
    }
    resolutionContext.addAndResolveDependencies(file)
  }

  return {
    resolvedFiles: [...resolutionContext.resolvedFiles.values()],
    diagnostics: resolutionContext.diagnostics,
  }
}
