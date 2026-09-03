import type { Module } from "../../code-system/modules/module.page-type.ts"

export const observationStore = {
  id: "01a0680d-8b48-7000-aaf0-e6ce2670d86b",
  pageTypeSlug: "module",
  slug: "observation-store",
  definition:
    "each feature's last observation held for one window, and the settled write that lands it",
  code: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A recording that changes nothing is written nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A write starts only once the recording has settled.",
    },
    {
      invariantKind: "departure",
      statement: "A recording inside the settle restarts the settle rather than joining the write.",
    },
    {
      invariantKind: "departure",
      statement: "Writes run one after another rather than at once.",
    },
    {
      invariantKind: "departure",
      statement: "A refused write leaves the last written state where it was.",
    },
    {
      invariantKind: "departure",
      statement: "State that did not land is written again by the next write.",
    },
    {
      invariantKind: "departure",
      statement: "The URL a write carries names the page rather than a server.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing has ever listened on the origin the URL is built from.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming its own fetch starts no child and disposes of none.",
    },
    {
      invariantKind: "departure",
      statement: "A store naming no fetch writes through a bun child of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The child is started at the first write rather than at activation.",
    },
    {
      invariantKind: "departure",
      statement: "Disposing asks for the last write before letting the writer go.",
    },
    {
      invariantKind: "departure",
      statement: "Everything recorded inside the last settle lands before the writer is let go.",
    },
    {
      invariantKind: "departure",
      statement: "The time on an observation is asked of the clock the caller named.",
    },
    {
      invariantKind: "departure",
      statement: "One store is held for the extension and reached by name rather than passed.",
    },
    {
      invariantKind: "departure",
      statement: "Recording before a store is set is dropped rather than refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here defers a commit.",
    },
  ],
} as const satisfies Module
