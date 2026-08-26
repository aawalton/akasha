import * as ts from "typescript"

export interface FileSpec {
  readonly path: string
  readonly contents: string
}

export function makeProgram(files: readonly FileSpec[]): ts.Program {
  const fileMap = new Map(files.map((f) => [f.path, f.contents]))
  const host: ts.CompilerHost = {
    fileExists: (p) => fileMap.has(p),
    readFile: (p) => fileMap.get(p),
    getSourceFile: (p, languageVersion) => {
      const c = fileMap.get(p)
      if (c === undefined) return undefined
      return ts.createSourceFile(p, c, languageVersion, true)
    },
    writeFile: () => {},
    getDefaultLibFileName: () => "lib.d.ts",
    useCaseSensitiveFileNames: () => true,
    getCanonicalFileName: (p) => p,
    getCurrentDirectory: () => "/",
    getNewLine: () => "\n",
    getDirectories: () => [],
  }
  return ts.createProgram({
    rootNames: files.map((f) => f.path),
    options: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      strict: false,
      skipLibCheck: true,
      noLib: true,
      types: [],
    },
    host,
  })
}

export function getSf(program: ts.Program, path: string): ts.SourceFile {
  const sf = program.getSourceFile(path)
  if (!sf) throw new Error(`source file not in program: ${path}`)
  return sf
}
