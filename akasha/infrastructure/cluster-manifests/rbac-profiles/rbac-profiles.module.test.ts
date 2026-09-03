import { expect, test } from "bun:test"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { allProfiles, profileSources } from "./rbac-profiles.module.code.ts"

const root = rootFor(resolveRoots(), AKASHA)

test("every profile source in the checkout is found, named and non-empty", async () => {
  const sources = await profileSources(root)
  expect(sources.length).toBeGreaterThan(20)
  for (const source of sources) {
    expect(source.packageName).not.toBe("")
    expect(source.profiles.length).toBeGreaterThan(0)
    expect(source.path.endsWith("-rbac.module.code.ts")).toBe(true)
  }
})

test("no two profiles claim the same role in the same namespace", async () => {
  const seen = new Set<string>()
  for (const profile of await allProfiles(root)) {
    const at = `${profile.namespace}/${profile.roleName}`
    expect(seen.has(at)).toBe(false)
    seen.add(at)
  }
})

test("finding no profile source refuses rather than reading nothing granted", async () => {
  expect(profileSources("/nonexistent-checkout-root")).rejects.toThrow(/no RBAC profile source/)
})
