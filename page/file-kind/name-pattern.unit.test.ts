import { describe, expect, it } from "bun:test"
import { claimedAt, fileNameOf, patternMatches } from "./name-pattern.ts"

describe("fileNameOf", () => {
  it("takes the last segment of a path", () => {
    expect(fileNameOf("a/b/c.md")).toBe("c.md")
  })

  it("takes the whole of a bare name", () => {
    expect(fileNameOf("Dockerfile")).toBe("Dockerfile")
  })
})

describe("patternMatches", () => {
  it("matches a tail pattern against the end of the name", () => {
    expect(patternMatches("*.md", "notes.md")).toBe(true)
  })

  it("refuses a tail pattern where the name is only the tail", () => {
    expect(patternMatches("*.md", ".md")).toBe(false)
  })

  it("matches a whole-name pattern only in full", () => {
    expect(patternMatches("Dockerfile", "Dockerfile")).toBe(true)
    expect(patternMatches("Dockerfile", "my.Dockerfile")).toBe(false)
  })

  it("matches a name that is all suffix", () => {
    expect(patternMatches(".gitignore", ".gitignore")).toBe(true)
  })
})

describe("claimedAt", () => {
  const claims = [
    ["*.yaml", "yaml"],
    ["*.sops.yaml", "sops-yaml"],
    ["Dockerfile", "dockerfile"],
    ["*.md", "md"],
  ] as const

  it("gives the kind whose pattern is longest", () => {
    expect(claimedAt("main.cluster.sops.yaml", claims)).toBe("sops-yaml")
  })

  it("gives the plain kind where no longer pattern matches", () => {
    expect(claimedAt("action.yaml", claims)).toBe("yaml")
  })

  it("classifies a name carrying no extension", () => {
    expect(claimedAt("Dockerfile", claims)).toBe("dockerfile")
  })

  it("gives nothing where no pattern matches", () => {
    expect(claimedAt("notes.rtf", claims)).toBe(null)
  })
})
