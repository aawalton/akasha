import * as path from "path"
import * as ts from "typescript"
import * as cliDiagnostics from "../tstl-cli-diagnostics/tstl-cli-diagnostics.module.code.ts"
import { isRecord } from "../tstl-cli-is-record/tstl-cli-is-record.module.code.ts"
import {
  type ParsedCommandLine,
  updateParsedConfigFile,
} from "../tstl-cli-parse/tstl-cli-parse.module.code.ts"
import type {
  CompilerOptions,
  TstlOptions,
} from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import { normalizeSlashes } from "../tstl-utils/tstl-utils.module.code.ts"

export function locateConfigFile(
  commandLine: ParsedCommandLine
): ts.Diagnostic | string | undefined {
  const { project } = commandLine.options
  if (project == null) {
    if (commandLine.fileNames.length > 0) {
      return undefined
    }

    const searchPath = normalizeSlashes(process.cwd())
    return ts.findConfigFile(searchPath, ts.sys.fileExists)
  }

  if (commandLine.fileNames.length !== 0) {
    return cliDiagnostics.optionProjectCannotBeMixedWithSourceFilesOnACommandLine()
  }

  const fileOrDirectory = normalizeSlashes(path.resolve(process.cwd(), project))
  if (ts.sys.directoryExists(fileOrDirectory)) {
    const configFileName = path.posix.join(fileOrDirectory, "tsconfig.json")
    if (ts.sys.fileExists(configFileName)) {
      return configFileName
    } else {
      return cliDiagnostics.cannotFindATsconfigJsonAtTheSpecifiedDirectory(project)
    }
  } else if (ts.sys.fileExists(fileOrDirectory)) {
    return fileOrDirectory
  } else {
    return cliDiagnostics.theSpecifiedPathDoesNotExist(project)
  }
}

export function parseConfigFileWithSystem(
  configFileName: string,
  commandLineOptions?: CompilerOptions,
  system = ts.sys
): ParsedCommandLine {
  const configRootDir = path.dirname(configFileName)
  const parsedConfigFile = ts.parseJsonSourceFileConfigFileContent(
    ts.readJsonConfigFile(configFileName, system.readFile),
    system,
    configRootDir,
    commandLineOptions,
    configFileName
  )

  const cycleCache = new Set<string>()
  const extendedTstlOptions = getExtendedTstlOptions(
    configFileName,
    configRootDir,
    cycleCache,
    system
  )

  parsedConfigFile.raw.tstl = Object.assign(extendedTstlOptions, parsedConfigFile.raw.tstl ?? {})

  return updateParsedConfigFile(parsedConfigFile)
}

function resolveNpmModuleConfig(
  moduleName: string,
  configRootDir: string,
  host: ts.ModuleResolutionHost
): string | undefined {
  const resolved = ts.nodeNextJsonConfigResolver(
    moduleName,
    path.join(configRootDir, "tsconfig.json"),
    host
  )
  if (resolved.resolvedModule) {
    return resolved.resolvedModule.resolvedFileName
  }
}

function isParsedTsConfig(
  value: unknown
): value is { config?: { extends?: string | string[]; tstl?: TstlOptions } } {
  if (!isRecord(value)) {
    return false
  }
  const config = value.config
  if (config === undefined) {
    return true
  }
  if (!isRecord(config)) {
    return false
  }
  const extendsValue = config.extends
  if (extendsValue !== undefined) {
    if (Array.isArray(extendsValue)) {
      if (!extendsValue.every((entry) => typeof entry === "string")) {
        return false
      }
    } else if (typeof extendsValue !== "string") {
      return false
    }
  }
  const tstlValue = config.tstl
  if (tstlValue !== undefined && !isRecord(tstlValue)) {
    return false
  }
  return true
}

function getExtendedTstlOptions(
  configFilePath: string,
  configRootDir: string,
  cycleCache: Set<string>,
  system: ts.System
): TstlOptions {
  const absolutePath = ts.pathIsAbsolute(configFilePath)
    ? configFilePath
    : ts.pathIsRelative(configFilePath)
      ? path.resolve(configRootDir, configFilePath)
      : resolveNpmModuleConfig(configFilePath, configRootDir, system)

  if (absolutePath == null) {
    return {}
  }

  const newConfigRoot = path.dirname(absolutePath)

  if (cycleCache.has(absolutePath)) {
    return {}
  }

  cycleCache.add(absolutePath)
  const fileContent = system.readFile(absolutePath)
  const options = {}

  if (fileContent != null) {
    const parsed = ts.parseConfigFileTextToJson(configFilePath, fileContent)
    if (!isParsedTsConfig(parsed)) {
      return {}
    }
    const { config: parsedConfig } = parsed

    if (!parsedConfig) {
      return {}
    }

    if (parsedConfig.extends) {
      if (Array.isArray(parsedConfig.extends)) {
        for (const extendedConfigFile of parsedConfig.extends) {
          Object.assign(
            options,
            getExtendedTstlOptions(extendedConfigFile, newConfigRoot, cycleCache, system)
          )
        }
      } else {
        Object.assign(
          options,
          getExtendedTstlOptions(parsedConfig.extends, newConfigRoot, cycleCache, system)
        )
      }
    }

    if (parsedConfig.tstl) {
      Object.assign(options, parsedConfig.tstl)
    }
  }

  return options
}

export function createConfigFileUpdater(
  optionsToExtend: CompilerOptions
): (options: ts.CompilerOptions) => readonly ts.Diagnostic[] {
  const configFileMap = new WeakMap<ts.TsConfigSourceFile, ts.ParsedCommandLine>()
  return (options) => {
    const { configFile, configFilePath } = options
    if (configFile == null || configFilePath == null) return []

    let parsedConfigFile = configFileMap.get(configFile)
    if (parsedConfigFile === undefined) {
      parsedConfigFile = parseConfigFileWithSystem(configFilePath, optionsToExtend, ts.sys)
      configFileMap.set(configFile, parsedConfigFile)
    }

    Object.assign(options, parsedConfigFile.options)
    return parsedConfigFile.errors
  }
}
