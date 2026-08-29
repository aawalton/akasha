import type { Finding } from "../finding.page-type.ts"

export const thePatchIsAMapNotADiff = {
  id: "01a04bdd-596d-77fd-936a-65eb5a597f88",
  pageTypeSlug: "finding",
  slug: "the-patch-is-a-map-not-a-diff",
  domainSlug: "domain/command-system",
  claim:
    "The new write path carries a patch as a base commit and a map of bodies, which departs from the ops mechanism the owner named as the reference.",
  evidence:
    "Ops holds the same information and serialises it: it spills in-memory bodies to a temporary directory, writes real loose objects into the repository's own object store, builds a throwaway index, diffs it to a unified diff string, writes that string to a second temporary directory, and the gate immediately reads the tree and applies the diff back to recover exactly the map it started from — all inside one process. The diff string has no other reader but a debug flag. Nothing in that round trip is load-bearing, and the object writes mean a gate that judges a change also mutates the repository whether or not the change is refused. The map form keeps every idea worth keeping, since a check is handed bytes through the tree shape either way and never learns where they came from. Recorded because the owner said to follow ops here and invited a better path, so this is the place he should check whether I took the invitation too far.",
} as const satisfies Finding
