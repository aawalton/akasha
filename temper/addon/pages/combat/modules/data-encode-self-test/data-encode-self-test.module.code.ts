import { decode } from "akasha/temper/addon/pages/combat/modules/data-encode-decoder/data-encode-decoder.module.code.ts"
import { encode } from "akasha/temper/addon/pages/combat/modules/data-encode-encoder/data-encode-encoder.module.code.ts"
import {
  LOG_LEVELS,
  printLog,
  RUNTIME,
} from "akasha/temper/addon/pages/combat/modules/data-encode-runtime/data-encode-runtime.module.code.ts"
import type {
  LdeValue,
  LuaTable,
  TestResult,
} from "akasha/temper/addon/pages/combat/modules/data-encode-types/data-encode-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

function compareTables(this: void, t1: unknown, t2: unknown): boolean {
  if (type(t1) !== type(t2)) {
    return false
  }
  if (type(t1) !== "table") {
    return t1 === t2
  }
  const tbl1 = t1 as LuaTable
  const tbl2 = t2 as LuaTable
  for (const [k, v] of pairs(tbl1)) {
    if (type(v) === "table" && type(tbl2[k]) === "table") {
      compareTables(v, tbl2[k])
    } else if (v !== tbl2[k]) {
      if (type(v) === "number" && tostring(v) !== tostring(tbl2[k])) {
        printLog(
          LOG_LEVELS.debug,
          "Index %s should be %s but is %s.",
          tostring(k),
          tostring(v),
          tostring(tbl2[k])
        )
        return false
      }
    }
  }
  for (const [k, v] of pairs(tbl2)) {
    if (type(v) === "table" && type(tbl1[k]) === "table") {
      compareTables(v, tbl1[k])
    } else if (v !== tbl1[k]) {
      if (type(v) === "number" && tostring(v) !== tostring(tbl1[k])) {
        printLog(
          LOG_LEVELS.debug,
          "Index %s should be %s but is %s.",
          tostring(k),
          tostring(tbl1[k]),
          tostring(v)
        )
        return false
      }
    }
  }
  return true
}

export function performTest(
  this: void,
  testname: string,
  testData: unknown,
  testDictLocal?: LdeValue[] | true,
  testDictGlobal?: LdeValue[]
): TestResult {
  const testresult: TestResult = {}
  if (RUNTIME.debug) {
    RUNTIME.testresult = testresult
  }
  testresult.testDictGlobal = testDictGlobal
  const encoded = encode(testData, testDictLocal, testDictGlobal)
  testresult.encoded = encoded
  if (testDictGlobal !== undefined) {
    testDictGlobal[testDictGlobal.length - 1] = "testDictGlobal"
  }
  const [decoded, dict] = decode(encoded, testDictGlobal)
  testresult.decoded = decoded
  testresult.dict = dict
  const result = compareTables(testData, decoded)
  testresult.result = result
  printLog(LOG_LEVELS.info, "Test '%s': %s", testname, result ? "passed" : "failed")
  return testresult
}
