---
page-type-slug: finding
slug: enrolled-by-name-and-unreportable
title: "CI enrols a test file by a type word in its name, and the guard against unenrolled files skips exactly the files that lack one"
domain-slug: domain/test-file
---

# Claim

A test file joins the CI test steps by carrying `.unit.`, `.property.` or `.component.` in its name, and by nothing else. 615 of the repository's 2,417 test files carry none of the three, so no CI step covers them. 464 of those are named plainly `<stem>.test.ts`, with no type word at all.

The check written to report a test file no step covers cannot report any of them. `check-test-step-paths.ts` treats a file as an orphan only when it already has one of the three type words, so the files it would need to name are the exact files it skips. A test file with no type word is dropped silently at enrolment and is then invisible to the guard against silent dropping.

Nobody decides this. The file is written, named the way its neighbours are named, and is outside CI from that moment, with nothing anywhere reporting the omission.

# Evidence

Measured 2026-08-28 at `f7d029f60`.

ENROLMENT IS A FILENAME TEST. `tools/lib/check-workflow/test-step-paths.ts:2` and `:20-25`:

    export const TEST_TYPES = ["unit", "property", "component"] as const

    export function detectTestType(file: string): TestType | undefined {
      for (const t of TEST_TYPES) {
        if (file.endsWith(`.${t}.test.ts`) || file.endsWith(`.${t}.test.tsx`)) return t
      }
      return undefined
    }

`groupTestFilesByType` at `:36-38` drops what that returns nothing for:

    const type = detectTestType(f)
    if (type === undefined) continue

and `generateTestSteps` at `:55-57` builds a step per type from those buckets alone. A file with no type word therefore reaches no step. There is no list anywhere naming the files a step covers, so nothing is forgotten — the name is the whole enrolment.

THE COUNTS, OVER ONE STATED DENOMINATOR. `git ls-files -- '*.test.ts' '*.test.tsx'` at this commit gives 2,417 files. Applying `detectTestType` to each:

    CI-enrolled  (.unit / .property / .component)   1,802
    unenrolled                                        615

    of the 615:   bare `<stem>.test.ts`     464
                  .on-demand               113
                  .on-checks                22
                  .cli                       7
                  .smoke                     5
                  .integration               3
                  .data                      1

569 of the 615 stand under `tools/`. An independent sweep by another agent reached 1,802 enrolled from a differently-built file list, so the enrolled figure is the same from two directions; the unenrolled decomposition here is over 2,417 and should be quoted with that denominator.

THE GUARD SKIPS EXACTLY WHAT IT IS FOR. `infra/cluster-checks/src/checks/check-test-step-paths.ts:53`:

    return detectTestType(file) === undefined ? [] : [{ kind: "orphan", file }]

An orphan is reported only where `detectTestType` already succeeded. So the check reports a file that has a type word but sits outside the roots a step covers, and says nothing about a file with no type word — which is the larger population and the one nothing else covers either.

THE CASE THAT PROMPTED THIS. `tools/tests/refusals-bound.test.ts` is a bare `.test.ts`. `detectTestType` returns undefined for it, so it is in no CI step and `check-test-step-paths` will not name it. It has been failing 12 of its 19 cases, at head and at the parent commit.

IT IS NOT OUTSIDE EVERY SUITE, AND THAT SHOULD NOT BE OVERSTATED. `refusals-bound.test.ts` does match `suite-runs`'s `SUITE_GLOB = "tools/**/*.test.ts"` and carries no `.on-demand` suffix, so the standard suite asks for it by name on every run. It sorts to index 400 of 581 and the suite reaches 72, so it is asked for and never reached. The claim here is about CI enrolment, not about the standard suite, and a file can be outside one and inside the other.

THE CI STEPS DO NOT CURRENTLY RUN AT ALL. Reported to me by a delegated sweep and not verified by me end to end: the checks workflow's test steps carry `when: { event: "push", branch: "!main" }` at `tools/lib/check-workflow/index.ts:215`, while the only writer of pipeline pages, `tools/lib/main-pipeline-creator/create.ts:110`, handles `main` alone, and `pages/domain/branch-pipeline.domain.md:15` says a branch pipeline is started by somebody asking for it rather than by a push. If that holds, the filter admits only branches for which nothing builds a pipeline. I have verified the two lines of `test-step-paths.ts` and the one line of `check-test-step-paths.ts` above myself; I have not verified the workflow wiring, and it is recorded here as a lead rather than as a finding.

THE SAME SWEEP ALSO REPORTED a seeding defect worth checking separately: `tools/lib/check-workflow/check-configs.ts:169-171` seeds the `test-step-paths` check on paths under `infra/cluster-checks/src/lib/`, and the two files it names stand at `tools/lib/check-workflow/` instead. Unverified by me.

NOT SETTLED. Whether the three type words are meant to be the whole of the CI population, or whether the 464 bare files are an accumulated drift from a convention nobody enforced, is a question for whoever owns the naming. `pages/domain/file-naming-tests.domain.md:25` says a suffix between the stem and the test word "appears only where one file needs several test files and cannot be split" — which reads as the opposite policy from the one CI enrolment depends on. Those two cannot both be right, and I am not settling which is.
