#!/usr/bin/env bun
import { compile } from "../compile"

const procName = process.argv[2]
if (procName == null || procName === "") {
  console.error("usage: bun compile-trigger-proc <proc-name>  (e.g. set-updated-at)")
  process.exit(2)
}

const result = compile({ procName })
process.stdout.write(result.sql)
