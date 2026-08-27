import { describe, expect, test } from "bun:test"
import {
  applyBoundaryRoute,
  BOUNDARY_ROUTES,
  REFUSED_ROOT_ELEMENT,
  renderBoundaryRoutes,
  satisfiesVisibleBoundary,
} from "../lib/component-layout-boundary.ts"
import { dispatchToEntries } from "../lib/syntax-scanner-entry.ts"
import { componentLayoutJsxEntry } from "./check-component-layout.ts"

const REFUSED_SOURCE = `export function Probe() {
  return <div className="p-6">content</div>
}
`

const REFUSED_FILE = "probe/src/probe.tsx"

const REPO_ROOT = "/planted/tree"

function refusalMessages(): readonly string[] {
  const buckets = dispatchToEntries({
    files: [{ rel: REFUSED_FILE, source: REFUSED_SOURCE }],
    entries: [componentLayoutJsxEntry],
    repoRoot: REPO_ROOT,
  })
  const bucket = buckets[0]
  if (bucket === undefined) throw new Error("dispatch returned no bucket for the entry")
  return bucket.findings.map((finding) => finding.message)
}

describe("root-padding refusal — every route it offers, the predicate has", () => {
  test("the element the refusal is addressed to carries no boundary of its own", () => {
    expect(satisfiesVisibleBoundary(REFUSED_ROOT_ELEMENT)).toBe(false)
  })

  for (const route of BOUNDARY_ROUTES) {
    test(`\`${route.label}\` clears the refusal it is offered for`, () => {
      expect(satisfiesVisibleBoundary(applyBoundaryRoute(route))).toBe(true)
    })
  }

  test("a route offering only an interactive variant clears nothing", () => {
    const phantom = { label: "interactive variant", remedy: { tokens: ["hover:"] } }
    expect(satisfiesVisibleBoundary(applyBoundaryRoute(phantom))).toBe(false)
  })
})

describe("root-padding refusal — it offers the table's routes and no others", () => {
  test("the refused source is refused once, so there is a message to read", () => {
    expect(refusalMessages().length).toBe(1)
  })

  test("the refusal ends in the list composed from BOUNDARY_ROUTES", () => {
    const [message] = refusalMessages()
    expect(message).toEndWith(`(${renderBoundaryRoutes()})`)
  })
})
