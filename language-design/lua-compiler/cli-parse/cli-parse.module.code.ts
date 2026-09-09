import { assertNever } from "@akasha/utils/narrow/assert-never"
import * as ts from "typescript"
import { z } from "zod"
import * as cliDiagnostics from "../cli-diagnostics/cli-diagnostics.module.code.ts"
import {
  BuildMode,
  type CompilerOptions,
  LuaLibImportKind,
  LuaTarget,
} from "../compiler-options/compiler-options.module.code.ts"

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
    name: "noEmitLua",
    description:
      "Write no Lua. Where this is unstated, `noEmit` says whether Lua is written, so a compile emitting no JavaScript states this as false.",
    type: "boolean",
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
    description: "List of Lua compiler plugins.",
    type: "json-array-of-objects",
  },
  {
    name: "verbose",
    description: "Provide verbose output useful for diagnosing problems.",
    type: "boolean",
  },
  {
    name: "noResolvePaths",
    description: "An array of paths the compiler should not resolve and keep as-is.",
    type: "array",
  },
  {
    name: "lua51AllowTryCatchInAsyncAwait",
    description: "Always allow try/catch in async/await functions for Lua 5.1.",
    type: "boolean",
  },
  {
    name: "measurePerformance",
    description: "Measure performance of the Lua compiler.",
    type: "boolean",
  },
]

export function updateParsedConfigFile(parsedConfigFile: ts.ParsedCommandLine): ParsedCommandLine {
  let hasRootLevelOptions = false
  for (const [name, rawValue] of Object.entries(parsedConfigFile.raw)) {
    const option = optionDeclarations.find((declaration) => declaration.name === name)
    if (!option) continue

    if (parsedConfigFile.raw.luaCompiler === undefined) parsedConfigFile.raw.luaCompiler = {}
    parsedConfigFile.raw.luaCompiler[name] = rawValue
    hasRootLevelOptions = true
  }

  if (parsedConfigFile.raw.luaCompiler) {
    if (hasRootLevelOptions) {
      parsedConfigFile.errors.push(
        cliDiagnostics.optionsAreMovingToTheLuaCompilerObject(parsedConfigFile.raw.luaCompiler)
      )
    }

    for (const [name, rawValue] of Object.entries(parsedConfigFile.raw.luaCompiler)) {
      const option = optionDeclarations.find((declaration) => declaration.name === name)
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
    const option = optionDeclarations.find((declaration) => {
      if (declaration.name.toLowerCase() === argumentName.toLowerCase()) return true
      if (isShorthand && declaration.aliases) {
        return declaration.aliases.some((a) => a.toLowerCase() === argumentName.toLowerCase())
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

function readCommandLineArgument(option: CommandLineOption, value: unknown): CommandLineArgument {
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
  value: ts.CompilerOptionsValue
}

function readValue(
  option: CommandLineOption,
  value: unknown,
  source: OptionSource
): ReadValueResult {
  if (value === null) return { value }

  const wrongType = (): ReadValueResult => ({
    value: undefined,
    error: cliDiagnostics.compilerOptionRequiresAValueOfType(option.name, option.type),
  })

  switch (option.type) {
    case "boolean": {
      if (typeof value !== "boolean") return wrongType()
      return { value }
    }
    case "string": {
      if (typeof value !== "string") return wrongType()
      return { value }
    }
    case "array":
    case "json-array-of-objects": {
      if (source === OptionSource.CommandLine) {
        if (typeof value !== "string") return wrongType()

        if (option.type === "array") {
          return { value: value.split(",") }
        }

        try {
          const objects = JsonArraySchema.parse(JSON.parse(value))
          if (!Array.isArray(objects)) return wrongType()
          return { value: objects }
        } catch (e) {
          if (!(e instanceof SyntaxError)) throw e

          return {
            value: undefined,
            error: cliDiagnostics.compilerOptionCouldNotParseJson(option.name, e.message),
          }
        }
      }

      if (!Array.isArray(value)) return wrongType()
      return { value }
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
    default:
      return assertNever(option)
  }
}
