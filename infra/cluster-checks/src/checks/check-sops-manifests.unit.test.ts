import { describe, expect, test } from "bun:test"
import { assertManifestShape } from "../lib/sops-manifest.ts"

describe("assertManifestShape", () => {
  test("valid single-doc Secret manifest", () => {
    const yaml = `apiVersion: v1
kind: Secret
metadata:
  name: foo
stringData:
  KEY: value
`
    expect(assertManifestShape(yaml)).toEqual({ ok: true })
  })

  test("missing apiVersion is reported", () => {
    const yaml = `kind: Secret
metadata:
  name: foo
`
    const r = assertManifestShape(yaml)
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.errors.some((e) => /apiVersion/.test(e))).toBe(true)
  })

  test("missing kind is reported", () => {
    const yaml = `apiVersion: v1
metadata:
  name: foo
`
    const r = assertManifestShape(yaml)
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.errors.some((e) => /kind/.test(e))).toBe(true)
  })

  test("779bf5dbd regression: JSON wrapper with stringified data and no apiVersion/kind", () => {
    const yaml = `data: "ENC[AES256_GCM,data:abc]"
sops:
  age:
    - recipient: age1abc
`
    const r = assertManifestShape(yaml)
    expect(r.ok).toBe(false)
    if (!r.ok) {
      expect(r.errors.some((e) => /apiVersion/.test(e))).toBe(true)
      expect(r.errors.some((e) => /kind/.test(e))).toBe(true)
    }
  })

  test("empty document stream fails", () => {
    expect(assertManifestShape("").ok).toBe(false)
  })

  test("multi-doc with one missing kind fails on that specific doc", () => {
    const yaml = `apiVersion: v1
kind: Secret
metadata:
  name: a
---
apiVersion: v1
metadata:
  name: b
`
    const r = assertManifestShape(yaml)
    expect(r.ok).toBe(false)
    if (!r.ok) {
      expect(r.errors.some((e) => /doc\[1\].*kind/.test(e))).toBe(true)
      expect(r.errors.some((e) => /doc\[0\]/.test(e))).toBe(false)
    }
  })

  test("multi-doc with all docs valid passes", () => {
    const yaml = `apiVersion: v1
kind: Secret
metadata:
  name: a
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: b
`
    expect(assertManifestShape(yaml)).toEqual({ ok: true })
  })

  test("top-level array is rejected", () => {
    const yaml = `- foo
- bar
`
    const r = assertManifestShape(yaml)
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.errors[0]).toMatch(/array/)
  })

  test("empty apiVersion / kind values are rejected", () => {
    const yaml = `apiVersion: ""
kind: ""
`
    const r = assertManifestShape(yaml)
    expect(r.ok).toBe(false)
    if (!r.ok) {
      expect(r.errors.some((e) => /apiVersion/.test(e))).toBe(true)
      expect(r.errors.some((e) => /kind/.test(e))).toBe(true)
    }
  })
})
