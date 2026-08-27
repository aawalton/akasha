import { describe, expect, it } from "bun:test"
import { scanLibcSonameBindings } from "./libc-ffi-binding.ts"

const dl = (spec: string) => `dlopen(${JSON.stringify(spec)}, {})`

function scan(source: string) {
  return scanLibcSonameBindings({ file: "probe.ts", source })
}

describe("scanLibcSonameBindings", () => {
  it("flags the glibc soname — the exact #16408 defect", () => {
    const findings = scan(`const libc = ${dl("libc.so.6")}.symbols`)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.spec).toBe("libc.so.6")
    expect(findings[0]?.line).toBe(1)
  })

  it("flags a libc named by absolute path", () => {
    expect(scan(dl("/lib/x86_64-linux-gnu/libc.so.6"))).toHaveLength(1)
    expect(scan(dl("/ci-storage/tools/lib/libc.so.6"))).toHaveLength(1)
  })

  it("flags the musl loader and musl alias", () => {
    expect(scan(dl("/lib/ld-musl-x86_64.so.1"))).toHaveLength(1)
    expect(scan(dl("libc.musl-x86_64.so.1"))).toHaveLength(1)
  })

  it("flags a versioned glibc filename", () => {
    expect(scan(dl("libc-2.36.so"))).toHaveLength(1)
  })

  it("flags the sonames glibc splits out of the runtime and musl claims", () => {
    expect(scan(dl("libm.so.6"))).toHaveLength(1)
    expect(scan(dl("libdl.so.2"))).toHaveLength(1)
    expect(scan(dl("libpthread.so.0"))).toHaveLength(1)
    expect(scan(dl("librt.so.1"))).toHaveLength(1)
  })

  it("flags a binding embedded in a subprocess script string", () => {
    const findings = scan(["const script = `", `  const libc = ${dl("libc.so.6")}`, "`"].join("\n"))
    expect(findings).toHaveLength(1)
    expect(findings[0]?.line).toBe(2)
    expect(findings[0]?.column).toBe(16)
  })

  it("flags single-quoted and backtick specs", () => {
    const quoted = (q: string) => `dlopen(${q}libc.so.6${q}, {})`
    expect(scan(quoted("'"))).toHaveLength(1)
    expect(scan(quoted("`"))).toHaveLength(1)
  })

  it("permits the map-based binding — the prescribed form", () => {
    expect(scan("const libc = dlopen(resolveMappedLibc(), { waitpid: {} }).symbols")).toHaveLength(
      0
    )
    expect(scan("dlopen(libcPath, {})")).toHaveLength(0)
  })

  it("permits libraries whose names merely begin with the same letters", () => {
    expect(scan(dl("libcurl.so.4"))).toHaveLength(0)
    expect(scan(dl("libcrypto.so.3"))).toHaveLength(0)
    expect(scan(dl("/ci-storage/tools/lib/libcares.so.2"))).toHaveLength(0)
    expect(scan(dl("libmagic.so.1"))).toHaveLength(0)
  })

  it("permits a non-libc library", () => {
    expect(scan(dl("libz.so.1"))).toHaveLength(0)
  })

  it("does not fire on a libc name outside a dlopen call", () => {
    expect(scan("const LIBC = /^(libc\\.so\\.|ld-musl-)/")).toHaveLength(0)
    expect(scan('const path = "/lib/ld-musl-x86_64.so.1"')).toHaveLength(0)
  })

  it("reports every occurrence in a file", () => {
    const source = [dl("libc.so.6"), dl("libz.so.1"), dl("libm.so.6")].join("\n")
    expect(scan(source).map((f) => f.line)).toEqual([1, 3])
  })
})
