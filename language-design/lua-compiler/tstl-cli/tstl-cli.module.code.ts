#!/usr/bin/env bun
import * as ts from "typescript"
import * as tstlTranspiler from "../transpile-transpiler/transpile-transpiler.module.code.ts"
import * as cliDiagnostics from "../tstl-cli-diagnostics/tstl-cli-diagnostics.module.code.ts"
import { getHelpString, name } from "../tstl-cli-information/tstl-cli-information.module.code.ts"
import { parseCommandLine } from "../tstl-cli-parse/tstl-cli-parse.module.code.ts"
import { createDiagnosticReporter } from "../tstl-cli-report/tstl-cli-report.module.code.ts"
import {
  createConfigFileUpdater,
  locateConfigFile,
  parseConfigFileWithSystem,
} from "../tstl-cli-tsconfig/tstl-cli-tsconfig.module.code.ts"
import type * as tstlCompilerOptions from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import { isBundleEnabled } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import * as performance from "../tstl-measure-performance/tstl-measure-performance.module.code.ts"

const shouldBePretty = ({ pretty }: ts.CompilerOptions = {}) =>
  typeof pretty === "boolean" ? pretty : (ts.sys.writeOutputIsTTY?.() ?? false)

let reportDiagnostic = createDiagnosticReporter(false)
function updateReportDiagnostic(options?: ts.CompilerOptions): undefined {
  reportDiagnostic = createDiagnosticReporter(shouldBePretty(options))
}

function createWatchStatusReporter(options?: ts.CompilerOptions): ts.WatchStatusReporter {
  return ts.createWatchStatusReporter(ts.sys, shouldBePretty(options))
}

function executeCommandLine(args: readonly string[]): undefined {
  const firstArg = args[0]
  if (firstArg !== undefined && firstArg.startsWith("-")) {
    const firstOption = firstArg.slice(firstArg.startsWith("--") ? 2 : 1).toLowerCase()
    if (firstOption === "build" || firstOption === "b") {
      return performBuild(args.slice(1))
    }
  }

  const commandLine = parseCommandLine(args)

  if (commandLine.options.build) {
    reportDiagnostic(cliDiagnostics.optionBuildMustBeFirstCommandLineArgument())
    return void ts.sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped)
  }

  if (commandLine.errors.some((e) => e.category === ts.DiagnosticCategory.Error)) {
    commandLine.errors.forEach(reportDiagnostic)
    return void ts.sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped)
  }

  if (commandLine.options.version) {
    console.log(name)
    return void ts.sys.exit(ts.ExitStatus.Success)
  }

  if (commandLine.options.help) {
    console.log(name)
    console.log(getHelpString())
    return void ts.sys.exit(ts.ExitStatus.Success)
  }

  const configFileName = locateConfigFile(commandLine)
  if (typeof configFileName === "object") {
    reportDiagnostic(configFileName)
    return void ts.sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped)
  }

  const commandLineOptions = commandLine.options
  if (configFileName != null) {
    const configParseResult = parseConfigFileWithSystem(configFileName, commandLineOptions)

    updateReportDiagnostic(configParseResult.options)
    if (configParseResult.options.watch) {
      createWatchOfConfigFile(configFileName, commandLineOptions)
    } else {
      performCompilation(
        configParseResult.fileNames,
        configParseResult.projectReferences,
        configParseResult.options,
        ts.getConfigFileParsingDiagnostics(configParseResult)
      )
    }
  } else {
    updateReportDiagnostic(commandLineOptions)
    if (commandLineOptions.watch) {
      createWatchOfFilesAndCompilerOptions(commandLine.fileNames, commandLineOptions)
    } else {
      performCompilation(commandLine.fileNames, commandLine.projectReferences, commandLineOptions)
    }
  }
}

function performBuild(_args: readonly string[]): undefined {
  console.log("Option '--build' is not supported.")
  return void ts.sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped)
}

function performCompilation(
  rootNames: readonly string[],
  projectReferences: readonly ts.ProjectReference[] | undefined,
  options: tstlCompilerOptions.CompilerOptions,
  configFileParsingDiagnostics?: readonly ts.Diagnostic[]
): undefined {
  if (options.measurePerformance === true) performance.enableMeasurement()

  performance.startSection("createProgram")

  const program = ts.createProgram({
    rootNames,
    options,
    projectReferences,
    configFileParsingDiagnostics,
  })
  const preEmitDiagnostics = ts.getPreEmitDiagnostics(program)

  performance.endSection("createProgram")

  const { diagnostics: transpileDiagnostics, emitSkipped } = tstlTranspiler
    .createTranspiler()
    .emit({ program })

  const diagnostics = ts.sortAndDeduplicateDiagnostics([
    ...preEmitDiagnostics,
    ...transpileDiagnostics,
  ])
  diagnostics.forEach(reportDiagnostic)

  if (options.measurePerformance === true) reportPerformance()

  const exitCode =
    diagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error).length === 0
      ? ts.ExitStatus.Success
      : emitSkipped
        ? ts.ExitStatus.DiagnosticsPresent_OutputsSkipped
        : ts.ExitStatus.DiagnosticsPresent_OutputsGenerated

  return void ts.sys.exit(exitCode)
}

function createWatchOfConfigFile(
  configFileName: string,
  optionsToExtend: tstlCompilerOptions.CompilerOptions
): undefined {
  const watchCompilerHost = ts.createWatchCompilerHost(
    configFileName,
    optionsToExtend,
    ts.sys,
    ts.createSemanticDiagnosticsBuilderProgram,
    undefined,
    createWatchStatusReporter(optionsToExtend)
  )

  updateWatchCompilationHost(watchCompilerHost, optionsToExtend)
  ts.createWatchProgram(watchCompilerHost)
}

function createWatchOfFilesAndCompilerOptions(
  rootFiles: readonly string[],
  options: tstlCompilerOptions.CompilerOptions
): undefined {
  const watchCompilerHost = ts.createWatchCompilerHost(
    [...rootFiles],
    options,
    ts.sys,
    ts.createSemanticDiagnosticsBuilderProgram,
    undefined,
    createWatchStatusReporter(options)
  )

  updateWatchCompilationHost(watchCompilerHost, options)
  ts.createWatchProgram(watchCompilerHost)
}

function updateWatchCompilationHost(
  host: ts.WatchCompilerHost<ts.SemanticDiagnosticsBuilderProgram>,
  optionsToExtend: tstlCompilerOptions.CompilerOptions
): undefined {
  let hadErrorLastTime = true
  const updateConfigFile = createConfigFileUpdater(optionsToExtend)

  const transpiler = tstlTranspiler.createTranspiler()
  host.afterProgramCreate = (builderProgram) => {
    const program = builderProgram.getProgram()
    const options = program.getCompilerOptions()

    if (options.measurePerformance === true) performance.enableMeasurement()

    const configFileParsingDiagnostics: readonly ts.Diagnostic[] = updateConfigFile(options)

    let sourceFiles: ts.SourceFile[] | undefined
    if (!isBundleEnabled(options) && !hadErrorLastTime) {
      sourceFiles = []
      while (true) {
        const currentFile = builderProgram.getSemanticDiagnosticsOfNextAffectedFile()
        if (!currentFile) break

        if ("fileName" in currentFile.affected) {
          sourceFiles.push(currentFile.affected)
        } else {
          sourceFiles.push(...currentFile.affected.getSourceFiles())
        }
      }
    }

    const { diagnostics: emitDiagnostics } = transpiler.emit({ program, sourceFiles })

    const diagnostics = ts.sortAndDeduplicateDiagnostics([
      ...configFileParsingDiagnostics,
      ...program.getOptionsDiagnostics(),
      ...program.getSyntacticDiagnostics(),
      ...program.getGlobalDiagnostics(),
      ...program.getSemanticDiagnostics(),
      ...emitDiagnostics,
    ])

    diagnostics.forEach(reportDiagnostic)

    if (options.measurePerformance === true) reportPerformance()

    const errors = diagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error)
    hadErrorLastTime = errors.length > 0

    host.onWatchStatusChange?.(
      cliDiagnostics.watchErrorSummary(errors.length),
      host.getNewLine(),
      options
    )
  }
}

function reportPerformance() {
  if (performance.isMeasurementEnabled()) {
    console.log("Performance measurements: ")
    performance.forEachMeasure((name, duration) => {
      console.log(`  ${name}: ${duration.toFixed(2)}ms`)
    })
    console.log(`Total: ${performance.getTotalDuration().toFixed(2)}ms`)
    performance.disableMeasurement()
  }
}

function checkNodeVersion(): undefined {
  const [major, minor] = process.version.slice(1).split(".").map(Number)
  if (major === undefined || minor === undefined) {
    console.error(
      `@temper/shared-build-deploy-tstl failed to parse Node.js version: ${process.version}`
    )
    return void ts.sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped)
  }
  const isValid = major > 12 || (major === 12 && minor >= 13)
  if (!isValid) {
    console.error(
      `@temper/shared-build-deploy-tstl requires Node.js >=12.13.0, the current version is ${process.version}`
    )
    process.exit(1)
  }
}

checkNodeVersion()

if (ts.sys.setBlocking) {
  ts.sys.setBlocking()
}

executeCommandLine(ts.sys.args)
