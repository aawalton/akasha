import { describe, expect, test } from "bun:test"
import {
  BODY_MARKER,
  buildResolveScript,
  lockfileBodyIn,
  resolvedEntriesIn,
} from "./refresh-lockfiles"

const PACKAGE_JSON = '{\n  "name": "@alanwalton/native-shell"\n}'

describe("buildResolveScript", () => {
  test("resolves in a directory the run makes, naming no clone standing on the machine", () => {
    const s = buildResolveScript({ slug: "alanwalton", packageJson: PACKAGE_JSON })
    expect(s).toContain("rm -rf /var/tmp/mobile-lockfile/alanwalton")
    expect(s).toContain("mkdir -p /var/tmp/mobile-lockfile/alanwalton")
    expect(s).not.toContain("repos/code")
  })

  test("resolves without installing, so no build output is made to read a lockfile out of", () => {
    const s = buildResolveScript({ slug: "alanwalton", packageJson: PACKAGE_JSON })
    expect(s).toContain("npm install --package-lock-only")
  })

  test("carries the package.json it was given rather than fetching one on the far side", () => {
    const s = buildResolveScript({ slug: "atlas", packageJson: PACKAGE_JSON })
    expect(s).toContain("@alanwalton/native-shell")
  })

  test("a package.json carrying a quote survives the shell", () => {
    const awkward = `{"name":"it's","x":"y"}`
    const s = buildResolveScript({ slug: "atlas", packageJson: awkward })
    expect(s).toContain(`'{"name":"it'\\''s","x":"y"}'`)
  })
})

describe("lockfileBodyIn", () => {
  test("takes everything after the marker, npm's own chatter standing before it", () => {
    const body = '{\n  "lockfileVersion": 3\n}\n'
    expect(lockfileBodyIn(`noise\nmore noise\n${BODY_MARKER}\n${body}`)).toBe(body)
  })

  test("a body carrying the marker's own text is not cut at the second one", () => {
    const body = `{"note":"${BODY_MARKER}"}\n`
    expect(lockfileBodyIn(`${BODY_MARKER}\n${body}`)).toBe(body)
  })

  test("refuses when the marker never came, rather than writing a lockfile of npm's errors", () => {
    expect(() => lockfileBodyIn("npm error code EUNSUPPORTEDPROTOCOL")).toThrow(/no lockfile/)
  })

  test("refuses an empty body, which would land a lockfile determining nothing", () => {
    expect(() => lockfileBodyIn(`${BODY_MARKER}\n   \n`)).toThrow(/empty lockfile/)
  })
})

describe("resolvedEntriesIn", () => {
  test("counts what the lockfile pins rather than its lines", () => {
    expect(resolvedEntriesIn('{"a":{"resolved":"x"},"b":{"resolved":"y"}}')).toBe(2)
  })

  test("a lockfile resolving nothing counts nothing", () => {
    expect(resolvedEntriesIn('{"lockfileVersion":3}')).toBe(0)
  })
})
