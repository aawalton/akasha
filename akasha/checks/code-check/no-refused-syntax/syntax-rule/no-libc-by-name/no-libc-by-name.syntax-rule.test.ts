import { expect, test } from "bun:test"
import { parsed } from "../../no-refused-syntax.code-check.test-fixtures.ts"
import { isFamily, noLibcByName } from "./no-libc-by-name.syntax-rule.code.ts"

test("a file opening nothing is refused nothing", () => {
  expect(noLibcByName(parsed("export const one = 1\n"))).toEqual([])
})

test("the glibc runtime opened by name is refused", () => {
  const said = noLibcByName(parsed('dlopen("libc.so.6")\n'))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("libc.so.6")
})

test("the musl runtime is refused under its own name", () => {
  expect(noLibcByName(parsed('dlopen("libc.musl-x86_64.so.1")\n'))).toHaveLength(1)
})

test("the dynamic loader is refused under either name", () => {
  expect(noLibcByName(parsed('dlopen("ld-linux-x86-64.so.2")\n'))).toHaveLength(1)
  expect(noLibcByName(parsed('dlopen("ld-musl-x86_64.so.1")\n'))).toHaveLength(1)
})

test("a split library of the runtime is refused too", () => {
  expect(noLibcByName(parsed('dlopen("libpthread.so.0")\n'))).toHaveLength(1)
})

test("a library is named by the last part of its path", () => {
  expect(noLibcByName(parsed('dlopen("/usr/lib/x86_64-linux-gnu/libc.so.6")\n'))).toHaveLength(1)
  expect(isFamily("/usr/lib/libc.so.6")).toBe(true)
})

test("a library whose name merely begins with libc stands", () => {
  expect(noLibcByName(parsed('dlopen("libcurl.so.4")\n'))).toEqual([])
  expect(noLibcByName(parsed('dlopen("libcap.so.2")\n'))).toEqual([])
  expect(isFamily("libcurl.so.4")).toBe(false)
})

test("opening a library that is not the runtime stands", () => {
  expect(noLibcByName(parsed('dlopen("libsqlite3.so")\n'))).toEqual([])
})

test("dlopen reached through an object is refused as a bare one is", () => {
  expect(noLibcByName(parsed('ffi.dlopen("libc.so.6", {})\n'))).toHaveLength(1)
})

test("a name written in a template is read as a name", () => {
  expect(noLibcByName(parsed("dlopen(`libc.so.6`)\n"))).toHaveLength(1)
})

test("a name written inside a string is not a call", () => {
  expect(noLibcByName(parsed(`const one = 'dlopen("libc.so.6")'\n`))).toEqual([])
})

test("another function taking the same name is not this one", () => {
  expect(noLibcByName(parsed('open("libc.so.6")\n'))).toEqual([])
})

test("a name built as the code runs is not seen", () => {
  expect(noLibcByName(parsed("dlopen(pathFor(one))\n"))).toEqual([])
})

test("the line named is the line the call stands on", () => {
  const said = noLibcByName(parsed('const one = 1\ndlopen("libc.so.6")\n'))
  expect(said[0]?.line).toBe(2)
})

test("two openings are refused once each", () => {
  const text = 'dlopen("libc.so.6")\ndlopen("libm.so.6")\n'
  expect(noLibcByName(parsed(text))).toHaveLength(2)
})
