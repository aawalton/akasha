import { describe, expect, it } from "bun:test"

import { CI_TOOLCHAIN_URLS } from "@infra/ci-workflows/toolchain-manifest"

import {
  buildToolchainProvisionScript,
  buildToolchainVerifyScript,
  EXPECTED_TOOLCHAIN_BINARIES,
} from "./benchmark-provision"

describe("EXPECTED_TOOLCHAIN_BINARIES", () => {
  it("covers the tools the check registry needs beyond the base image", () => {
    for (const b of ["bun", "git", "ast-grep", "shellcheck", "lua5.1", "buildctl"]) {
      expect(EXPECTED_TOOLCHAIN_BINARIES).toContain(b)
    }
  })
})

describe("buildToolchainProvisionScript", () => {
  const script = buildToolchainProvisionScript().join("\n")

  it("sources every download URL from the shared manifest (no drift)", () => {
    for (const url of Object.values(CI_TOOLCHAIN_URLS)) {
      expect(script).toContain(url)
    }
  })

  it("installs the native extraction + lua deps via apt", () => {
    expect(script).toContain("apt-get install")
    expect(script).toContain("xz-utils")
    expect(script).toContain("unzip")
    expect(script).toContain("lua5.1")
  })

  it("writes everything under $TOOLS and seeds git-core + ssl", () => {
    expect(script).toContain('"$TOOLS/git-core/')
    expect(script).toContain('"$TOOLS/ssl/ca-certificates.crt"')
    expect(script).toContain('"$TOOLS/bun"')
  })

  it("exposes the toolchain on /usr/local/bin so nested shells resolve every tool", () => {
    expect(script).toContain("/usr/local/bin/$b")
    expect(script).toContain('ln -sfn "$TOOLS/$b"')
  })
})

describe("buildToolchainVerifyScript", () => {
  const verify = buildToolchainVerifyScript().join("\n")

  it("probes every expected binary and aborts loud + non-zero on a miss", () => {
    for (const b of EXPECTED_TOOLCHAIN_BINARIES) {
      expect(verify).toContain(b)
    }
    expect(verify).toContain("exit 1")
    expect(verify).toContain("toolchain incomplete")
  })
})
