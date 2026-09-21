import type { Finding } from "akasha/domain/finding/finding.page-type.types.ts"

export const aTestFileALandingAddsIsNotRunByThatLanding = {
  id: "01a0c5a3-7f3b-7ab8-aa22-d729e0be0814",
  type: "page-type/finding",
  slug: "a-test-file-a-landing-adds-is-not-run-by-that-landing",
  domain: "domain/test",
  claim:
    "A test file a landing adds is not run by that landing, so a new test first proves itself only when some later change happens to carry its folder.",
  evidence:
    'One landing added `music-rate-parts.command.test.ts` and edited `music-rate.command.test.ts`. The edited file drew a `phase: "test"` row; the added file drew none. A measuring apply run afterwards ran the added file green, so it was always sound, and nothing about the landing said it had gone unjudged. A test written and landed in the same change is the ordinary case, and it is the case where the writer most wants the run: those assertions have never executed anywhere.',
} as const satisfies Finding
