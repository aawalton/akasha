const m = await import("./two-page-type-sidecars-name-no-page-akasha-holds.finding.ts")
const f: any = m.twoPageTypeSidecarsNameNoPageAkashaHolds
console.log("claim", f.claim.length, "(max 500)")
console.log("evidence", f.evidence.length, "(max 2000)")
console.log("slug", f.slug.length, "(max 100)")
