import type { Finding } from "../finding.page-type.ts"

export const aNewUniquePropertyCostsTheGateMinutes = {
  id: "01a062e3-c9e9-7b4d-a03c-a9e0ed13d154",
  pageTypeSlug: "finding",
  slug: "a-new-unique-property-costs-the-gate-minutes",
  domainSlug: "workspace-package/checks",
  claim:
    "A change introducing a property that declares `unique` costs the gate minutes rather than seconds, while the same change declaring no `unique` costs seconds.",
  evidence:
    'Landing `agent-id` as a new text property: with `unique: "always"` the call burned 578 seconds of CPU inside ten minutes and was killed unfinished, and an earlier run of the same change across seven more files burned 1803 seconds inside thirty minutes and was killed too. Taking that one line out and changing nothing else, the same call answered in 46 seconds, spending 5.7 seconds of CPU, and reported real refusals. Both slow runs were killed rather than left to finish, so neither shows the cost has no ceiling. The gate was not slow for anyone else while this was measured: commits from other seats landed 1 to 27 seconds apart throughout. `id` already declares `unique: "always"` and costs those landings nothing, so the cost is in introducing a key rather than in carrying one. `identifier-names-one-page` is the only check that reads `unique`, and its page says it reads the index as the change leaves the index, which for a key no page carries yet would mean working that key out from nothing. That last sentence was read off the check\'s page rather than measured.',
} as const satisfies Finding
