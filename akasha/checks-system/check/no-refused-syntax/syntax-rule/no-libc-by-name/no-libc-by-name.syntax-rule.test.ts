import { expect, test } from "bun:test"
import ts from "typescript"
import type { Standing } from "../syntax-rule.page-type.ts"
import { isFamily, noLibcByName } from "./no-libc-by-name.syntax-rule.code.ts"

const PATH = "akasha/one/probe.module.code.ts"

function standing(text: string): Standing {
  return {
    path: PATH,
    source: ts.createSourceFile(PATH, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS),
  }
}

test("a file opening nothing is refused nothing", () => {
  expect(noLibcByName(standing("export const one = 1\n"))).toEqual([])
})

test("the glibc runtime opened by name is refused", () => {
  const said = noLibcByName(standing('dlopen("libc.so.6")\n'))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("libc.so.6")
})

test("the musl runtime is refused under its own name", () => {
  expect(noLibcByName(standing('dlopen("libc.musl-x86_64.so.1")\n'))).toHaveLength(1)
})

test("the dynamic loader is refused under either name", () => {
  expect(noLibcByName(standing('dlopen("ld-linux-x86-64.so.2")\n'))).toHaveLength(1)
  expect(noLibcByName(standing('dlopen("ld-musl-x86_64.so.1")\n'))).toHaveLength(1)
})

test("a split library of the runtime is refused too", () => {
  expect(noLibcByName(standing('dlopen("libpthread.so.0")\n'))).toHaveLength(1)
})

test("a library is named by the last part of its path", () => {
  expect(noLibcByName(standing('dlopen("/usr/lib/x86_64-linux-gnu/libc.so.6")\n'))).toHaveLength(1)
  expect(isFamily("/usr/lib/libc.so.6")).toBe(true)
})

test("a library whose name merely begins with libc stands", () => {
  expect(noLibcByName(standing('dlopen("libcurl.so.4")\n'))).toEqual([])
  expect(noLibcByName(standing('dlopen("libcap.so.2")\n'))).toEqual([])
  expect(isFamily("libcurl.so.4")).toBe(false)
})

test("opening a library that is not the runtime stands", () => {
  expect(noLibcByName(standing('dlopen("libsqlite3.so")\n'))).toEqual([])
})

test("dlopen reached through an object is refused as a bare one is", () => {
  expect(noLibcByName(standing('ffi.dlopen("libc.so.6", {})\n'))).toHaveLength(1)
})

test("a name written in a template is read as a name", () => {
  expect(noLibcByName(standing("dlopen(`libc.so.6`)\n"))).toHaveLength(1)
})

test("a name written inside a string is not a call", () => {
  expect(noLibcByName(standing(`const one = 'dlopen("libc.so.6")'\n`))).toEqual([])
})

test("another function taking the same name is not this one", () => {
  expect(noLibcByName(standing('open("libc.so.6")\n'))).toEqual([])
})

test("a name built as the code runs is not seen", () => {
  expect(noLibcByName(standing("dlopen(pathFor(one))\n"))).toEqual([])
})

test("the line named is the line the call stands on", () => {
  const said = noLibcByName(standing('const one = 1\ndlopen("libc.so.6")\n'))
  expect(said[0]?.line).toBe(2)
})

test("two openings are refused once each", () => {
  const text = 'dlopen("libc.so.6")\ndlopen("libm.so.6")\n'
  expect(noLibcByName(standing(text))).toHaveLength(2)
})
