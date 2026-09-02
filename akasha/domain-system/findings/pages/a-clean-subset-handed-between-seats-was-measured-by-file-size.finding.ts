import type { Finding } from "../finding.page-type.ts"

export const aCleanSubsetHandedBetweenSeatsWasMeasuredByFileSize = {
  id: "01a060fa-0a9b-7c0f-8e59-d427ac019ea3",
  pageTypeSlug: "finding",
  slug: "a-clean-subset-handed-between-seats-was-measured-by-file-size",
  domainSlug: "domain/temper",
  claim:
    "A clean subset handed from one seat to the next was measured by file size rather than by import closure, and the number was wrong by more than a factor of four. game-companions-core was handed over as 132 of 133 files clean. Measuring what each file's import closure reaches answers 30. The 103 files between the two numbers all reach one 119,803-byte table, which is what decides whether a file can land.",
  evidence:
    "Measured 2026-09-02.\n\nA seat handed on four packages with their clean subsets already counted: game-characters-skills 24 clean of 39, game-characters-character 19 of 24, game-characters-stats 304 of 322, game-companions-core 132 of 133.\n\nRemeasuring by transitive import closure, resolving cross-package specifiers through each package's exports map, reproduced the first two exactly: skills 24 and character 19. Stats answered 299 rather than 304, and companions answered 30 rather than 132.\n\nThe companions number is the one that matters. 132 is the count of files under 15,000 bytes, and only temper-companion-skill.generated.ts at 119,803 exceeds it. 30 is the count of files whose whole import closure stays under the ceiling. 103 companion files reach that one table, so none of them can land while it is outside, because an akasha file may import no file outside the akasha folder.\n\nThe two counts agreeing on skills and character is what makes this hard to catch: a handed-over census can be right about three packages and wrong about the fourth, and the fourth was the one the brief called mostly done. A count of files under the ceiling is not a count of files that can land, and the two differ by however much the mega tables are imported.\n\nThe rest of the handover held. Companions does need six modules from skills and one from character, and both packages landed first.",
} as const satisfies Finding
