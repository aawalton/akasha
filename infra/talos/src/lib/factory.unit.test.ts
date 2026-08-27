import { describe, expect, test } from "bun:test"
import {
  installerIsoUrl,
  metalCmdlineUrl,
  metalInitramfsUrl,
  metalKernelUrl,
  metalRawXzUrl,
} from "./factory"

describe("factory url helpers", () => {
  const id = "abc123"
  const v = "v1.10.0"
  const base = `https://factory.talos.dev/image/${id}/${v}`

  test("metalRawXzUrl points at the metal raw.xz asset", () => {
    expect(metalRawXzUrl(id, v)).toBe(`${base}/metal-amd64.raw.xz`)
  })

  test("installerIsoUrl points at the metal iso asset", () => {
    expect(installerIsoUrl(id, v)).toBe(`${base}/metal-amd64.iso`)
  })

  test("metalKernelUrl points at the kernel-amd64 asset (kexec primary path)", () => {
    expect(metalKernelUrl(id, v)).toBe(`${base}/kernel-amd64`)
  })

  test("metalInitramfsUrl points at the initramfs-amd64.xz asset (kexec primary path)", () => {
    expect(metalInitramfsUrl(id, v)).toBe(`${base}/initramfs-amd64.xz`)
  })

  test("metalCmdlineUrl points at the cmdline-metal-amd64 asset (canonical kexec cmdline)", () => {
    expect(metalCmdlineUrl(id, v)).toBe(`${base}/cmdline-metal-amd64`)
  })
})
