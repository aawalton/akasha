import type { Finding } from "../finding.page-type.ts"

export const elevenExerciseFilesWereAblatedWithReadersLeftDangling = {
  id: "01a0685d-cca7-71c8-9d5e-82c01ccfdaf6",
  pageTypeSlug: "finding",
  slug: "eleven-exercise-files-were-ablated-with-readers-left-dangling",
  domainSlug: "domain/akasha-migration",
  claim:
    "The eleven tracking and CLI files of `collections/exercises` were ablated once their content stood in `@akasha/exercise-access`, and nothing repointed the files that imported them. Twelve commands under `tools/commands/exercise/`, `tools/lib/daily-tracking/strength-points.ts`, five files under `collections/exercises/src/selection/` and ten `exports` entries in `collections/exercises/package.json` now name paths that are gone.",
  evidence:
    "Ablated: tracking/day-of-week.ts, day-volume.ts, derive.ts, digest.ts, digest-model.ts, history-core.ts, session-close.ts, volume.ts and cli/lib/fields.ts, resolve.ts, select-values.ts. Every one is recoverable from its HEAD blob; day-of-week.ts is 12a156e3d558bd08dc17bb1e95894e1e14fe2a42 and digest.ts is 78063a6c37704ab763a27fca1f4d133ce97fbc71.\n\nThe readers were left alone on purpose rather than missed. `collections/exercises/package.json` and `src/selection/` are held by other lanes of this swarm, and `akasha/alan/fitness/commands/` shows the tools lane already rebuilding the exercise commands as command pages, so repointing the old ones would be work thrown away. The adapted counterparts also do not keep the old signatures: `loadDigest` became `trainingDigest` answering a refusal rather than throwing, `progressionTarget` split into `targetPast` and `targetSaid`, and `loadDayVolumeWith` lost the handed-in ask because on-workstation code reads the checkout directly.\n\nWhat is owed: the `exports` block of collections/exercises/package.json wants its ten dead entries removed, and `tools/lib/daily-tracking/strength-points.ts` wants `loadDayVolumeWith(ask, dayStr)` swapped for `dayVolume(dayStr)` from `@akasha/exercise-access/session-volume`.",
} as const satisfies Finding
