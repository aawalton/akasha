import type { Finding } from "../finding.page-type.ts"

export const aStaleLockfileRecordLocksOneAgentOutOfTheRootManifest = {
  id: "01a062a7-8a88-737a-b37a-3916a1d05e31",
  pageTypeSlug: "finding",
  slug: "a-stale-lockfile-record-locks-one-agent-out-of-the-root-manifest",
  domainSlug: "domain/temper",
  claim:
    "`akasha edit` refuses a change to the root manifest while the body one agent recorded for `bun.lock` is older than the body on disk, and `akasha read` refuses every path outside `akasha/`, so that agent cannot refresh the record by anything the tool offers. The record is held per agent rather than per seat: a sibling agent in the same session, holding no record for the file, ran the identical call and it landed. The way out is to hand the call to another agent, which no refusal names.",
  evidence:
    'The refusal reads "`bun.lock` — what stands on disk is not the body you read, so writing it would put back what moved in between", then "nothing was written — read them again against what stands now". The record was set when an earlier `akasha edit` by that agent made the lockfile again and landed it at `21e18a8217`; sibling commits changed `bun.lock` afterwards. `akasha read --file-path bun.lock` answers that it reads only what is inside `akasha/`, so the read the refusal asks for cannot be run. Three attempts by the held agent were refused identically: naming `bun.lock` in the same call with its on-disk body as both the passage and what it becomes, `--break-the-glass` with a stated reason, and a plain retry at four different HEADs. `bun.lock` matched HEAD in the working tree throughout, so this is the record rather than a dirty file. A second agent given the same three file arguments met only the ordinary owed-reads gate, cleared 13 paths under `akasha/` in two batches, and landed `9433691edb`. Its lockfile regeneration was no small thing: 18 lines added and 64 taken, sweeping drift from other seats\' landed manifests that had been dammed up for as long as the orphaned workspace row refused every regeneration.',
} as const satisfies Finding
