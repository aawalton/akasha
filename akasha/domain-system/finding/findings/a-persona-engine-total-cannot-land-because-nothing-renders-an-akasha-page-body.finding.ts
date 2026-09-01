import type { Finding } from "../finding.page-type.ts"

export const aPersonaEngineTotalCannotLandBecauseNothingRendersAnAkashaPageBody = {
  id: "01a05c1f-c8c6-7142-aff8-3e6ee1914b6f",
  pageTypeSlug: "finding",
  slug: "a-persona-engine-total-cannot-land-because-nothing-renders-an-akasha-page-body",
  domainSlug: "domain/akasha-migration",
  claim:
    "The daily-tracking points recompute cannot write a persona's engine total back, because a persona now stands as a TypeScript file and nothing renders a page body out of the keys a patch carries, so `patch persona/eppie` refuses. This is why no persona carries a total: not a key asked for by the wrong name, but a value nothing can land. With the key spelling repaired the recompute reaches this and exits 1 here.",
  evidence:
    "Run on 2026-09-01 after the store spelling repair landed at ae7ff89ebb, `bun services/daily-tracking-points.ts` exited 1 saying: `the eppie engine total went unwritten: patch persona/eppie did not land: the store writes a path and a whole body, and nothing in akasha renders a page's body out of the keys it carries, so these values cannot become the file this would write — land it with writeFiles or patchFiles naming the path and the whole body, or through the akasha command line`. Two earlier faults on that same run were passed first. The persona value read answered no health persona at all before the spelling repair, refusing with `no Health persona is titled Aelwyn`; it now answers six, aelwyn among them. The persona-day writes then landed: fifty persona-day pages dated 2026-08-18 through 2026-08-31 held `green-day-points: 10000`, a bar no persona carries, real bars running 4 to 400, and the repaired recompute rewrote every one to the true bar, aelwyn-2026-08-27 going from 10000 to 400. None of the fifty remain and all are committed. What stands is the write direction alone. A persona page is a TypeScript file under the persona system, and the recompute reaches it through the store's patch, which composes a whole body; no renderer turns persona keys back into that file, so a total has never landed and a search for totalPoints matches none of the forty-two persona files. Until a persona total can be written the recompute cannot finish, and the daily-tracking-points timer is stopped and wants to stay stopped.",
} as const satisfies Finding
