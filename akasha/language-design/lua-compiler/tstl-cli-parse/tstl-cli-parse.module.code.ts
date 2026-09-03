import * as ts from "typescript"
import { z } from "zod"
import * as cliDiagnostics from "../tstl-cli-diagnostics/tstl-cli-diagnostics.module.code.ts"
import {
  BuildMode,
  type CompilerOptions,
  LuaLibImportKind,
  LuaTarget,
} from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"

const JsonArraySchema = z.unknown()

export interface ParsedCommandLine extends ts.ParsedCommandLine {
  options: CompilerOptions
}

interface CommandLineOptionBase {
  name: string
  aliases?: readonly string[]
  description: string
}

interface CommandLineOptionOfEnum extends CommandLineOptionBase {
  type: "enum"
  choices: readonly string[]
}

interface CommandLineOptionOfPrimitive extends CommandLineOptionBase {
  type: "boolean" | "string" | "json-array-of-objects" | "array"
}

type CommandLineOption = CommandLineOptionOfEnum | CommandLineOptionOfPrimitive

export const optionDeclarations: CommandLineOption[] = [
  {
    name: "buildMode",
    description:
      "'default' or  'library'. Compiling as library will not resolve external dependencies.",
    type: "enum",
    choices: Object.values(BuildMode),
  },
  {
    name: "extension",
    description: 'File extension for the resulting Lua files. Defaults to ".lua"',
    type: "string",
  },
  {
    name: "luaBundle",
    description: "The name of the lua file to bundle output lua to. Requires luaBundleEntry.",
    type: "string",
  },
  {
    name: "luaBundleEntry",
    description:
      "The entry *.ts file that will be executed when entering the luaBundle. Requires luaBundle.",
    type: "string",
  },
  {
    name: "luaLibImport",
    description: "Specifies how js standard features missing in lua are imported.",
    type: "enum",
    choices: Object.values(LuaLibImportKind),
  },
  {
    name: "luaTarget",
    aliases: ["lt"],
    description: "Specify Lua target version.",
    type: "enum",
    choices: Object.values(LuaTarget),
  },
  {
    name: "noImplicitGlobalVariables",
    description:
      'Specify to prevent implicitly turning "normal" variants into global variables in the transpiled output.',
    type: "boolean",
  },
  {
    name: "noImplicitSelf",
    description:
      'If "this" is implicitly considered an any type, do not generate a self parameter.',
    type: "boolean",
  },
  {
    name: "sourceMapTraceback",
    description: "Applies the source map to show source TS files and lines in error tracebacks.",
    type: "boolean",
  },
  {
    name: "luaPlugins",
    description: "List of @temper/shared-build-deploy-tstl plugins.",
    type: "json-array-of-objects",
  },
  {
    name: "tstlVerbose",
    description: "Provide verbose output useful for diagnosing problems.",
    type: "boolean",
  },
  {
    name: "noResolvePaths",
    description: "An array of paths that tstl should not resolve and keep as-is.",
    type: "array",
  },
  {
    name: "lua51AllowTryCatchInAsyncAwait",
    description: "Always allow try/catch in async/await functions for Lua 5.1.",
    type: "boolean",
  },
  {
    name: "measurePerformance",
    description: "Measure performance of the tstl compiler.",
    type: "boolean",
  },
]

export function updateParsedConfigFile(parsedConfigFile: ts.ParsedCommandLine): ParsedCommandLine {
  let hasRootLevelOptions = false
  for (const [name, rawValue] of Object.entries(parsedConfigFile.raw)) {
    const option = optionDeclarations.find((option) => option.name === name)
    if (!option) continue

    if (parsedConfigFile.raw.tstl === undefined) parsedConfigFile.raw.tstl = {}
    parsedConfigFile.raw.tstl[name] = rawValue
    hasRootLevelOptions = true
  }

  if (parsedConfigFile.raw.tstl) {
    if (hasRootLevelOptions) {
      parsedConfigFile.errors.push(
        cliDiagnostics.tstlOptionsAreMovingToTheTstlObject(parsedConfigFile.raw.tstl)
      )
    }

    for (const [name, rawValue] of Object.entries(parsedConfigFile.raw.tstl)) {
      const option = optionDeclarations.find((option) => option.name === name)
      if (!option) {
        parsedConfigFile.errors.push(cliDiagnostics.unknownCompilerOption(name))
        continue
      }

      const { error, value } = readValue(option, rawValue, OptionSource.TsConfig)
      if (error) parsedConfigFile.errors.push(error)
      if (parsedConfigFile.options[name] === undefined) parsedConfigFile.options[name] = value
    }
  }

  return parsedConfigFile
}

export function parseCommandLine(args: readonly string[]): ParsedCommandLine {
  return updateParsedCommandLine(ts.parseCommandLine(args), args)
}

function updateParsedCommandLine(
  parsedCommandLine: ts.ParsedCommandLine,
  args: readonly string[]
): ParsedCommandLine {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === undefined || !arg.startsWith("-")) continue

    const isShorthand = !arg.startsWith("--")
    const argumentName = arg.substring(isShorthand ? 1 : 2)
    const option = optionDeclarations.find((option) => {
      if (option.name.toLowerCase() === argumentName.toLowerCase()) return true
      if (isShorthand && option.aliases) {
        return option.aliases.some((a) => a.toLowerCase() === argumentName.toLowerCase())
      }

      return false
    })

    if (option) {
      parsedCommandLine.errors = parsedCommandLine.errors.filter(
        (e) =>
          !((e.code === 5023 || e.code === 5025) && String(e.messageText).includes(`'${args[i]}'.`))
      )

      const { error, value, consumed } = readCommandLineArgument(option, args[i + 1])
      if (error) parsedCommandLine.errors.push(error)
      parsedCommandLine.options[option.name] = value
      if (consumed) {
        parsedCommandLine.fileNames = parsedCommandLine.fileNames.filter((f) => f !== args[i + 1])
        i += 1
      }
    }
  }

  return parsedCommandLine
}

interface CommandLineArgument extends ReadValueResult {
  consumed: boolean
}

function readCommandLineArgument(option: CommandLineOption, value: any): CommandLineArgument {
  if (option.type === "boolean") {
    if (value === "true" || value === "false") {
      value = value === "true"
    } else {
      return { value: true, consumed: false }
    }
  }

  if (value === undefined) {
    return {
      error: cliDiagnostics.compilerOptionExpectsAnArgument(option.name),
      value: undefined,
      consumed: false,
    }
  }

  return { ...readValue(option, value, OptionSource.CommandLine), consumed: true }
}

const OptionSource = {
  CommandLine: "command-line",
  TsConfig: "tsconfig",
} as const
type OptionSource = (typeof OptionSource)[keyof typeof OptionSource]

interface ReadValueResult {
  error?: ts.Diagnostic
  value: any
}

function readValue(
  option: CommandLineOption,
  value: unknown,
  source: OptionSource
): ReadValueResult {
  if (value === null) return { value }

  switch (option.type) {
    case "boolean":
    case "string": {
      if (typeof value !== option.type) {
        return {
          value: undefined,
          error: cliDiagnostics.compilerOptionRequiresAValueOfType(option.name, option.type),
        }
      }

      return { value }
    }
    case "array":
    case "json-array-of-objects": {
      const isInvalidNonCliValue = source === OptionSource.TsConfig && !Array.isArray(value)
      const isInvalidCliValue = source === OptionSource.CommandLine && typeof value !== "string"

      if (isInvalidNonCliValue || isInvalidCliValue) {
        return {
          value: undefined,
          error: cliDiagnostics.compilerOptionRequiresAValueOfType(option.name, option.type),
        }
      }

      const shouldParseValue = source === OptionSource.CommandLine && typeof value === "string"
      if (!shouldParseValue) return { value }

      if (option.type === "array") {
        const array = value.split(",")
        return { value: array }
      }

      try {
        const objects = JsonArraySchema.parse(JSON.parse(value))
        if (!Array.isArray(objects)) {
          return {
            value: undefined,
            error: cliDiagnostics.compilerOptionRequiresAValueOfType(option.name, option.type),
          }
        }

        return { value: objects }
      } catch (e) {
        if (!(e instanceof SyntaxError)) throw e

        return {
          value: undefined,
          error: cliDiagnostics.compilerOptionCouldNotParseJson(option.name, e.message),
        }
      }
    }
    case "enum": {
      if (typeof value !== "string") {
        return {
          value: undefined,
          error: cliDiagnostics.compilerOptionRequiresAValueOfType(option.name, "string"),
        }
      }

      const enumValue = option.choices.find((c) => c.toLowerCase() === value.toLowerCase())
      if (enumValue === undefined) {
        const optionChoices = option.choices.join(", ")
        return {
          value: undefined,
          error: cliDiagnostics.argumentForOptionMustBe(`--${option.name}`, optionChoices),
        }
      }

      return { value: enumValue }
    }
  }
}
