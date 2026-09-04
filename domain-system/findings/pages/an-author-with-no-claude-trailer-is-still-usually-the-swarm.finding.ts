import type { Finding } from "../finding.page-type.ts"

export const anAuthorWithNoClaudeTrailerIsStillUsuallyTheSwarm = {
  id: "01a0687b-de90-7000-b463-317b17f58470",
  pageTypeSlug: "finding",
  slug: "an-author-with-no-claude-trailer-is-still-usually-the-swarm",
  domainSlug: "domain/akasha-migration",
  claim:
    "The corrected authorship test — author `Alan Walton` with no `Claude-Session` trailer means genuine human work — still names swarm commits. It is a weaker discriminator than `%an` alone but not a clean one, and a worker told there are none of these will find some and may set aside files nobody asked it to protect. Read the diff before believing the trailer.",
  evidence:
    'Measured 2026-09-03 over the 354 commits touching `tools/lib` in the previous 36 hours. 190 carry no `session_` trailer at all, but 183 of those are authored `Akasha`, which the lane brief already reads as a mechanical swarm landing. The residue is seven commits authored `Alan Walton` with no trailer: `a0ab5c760f` "probe", `48004c08e7` "commit", `f161452310`, `9476442f1e`, `c5f34afb36`, `574947b163` and `c91bf97f3d`. The lane brief asserted there were none in `tools/lib` in the last 24 hours; `a0ab5c760f` landed 2026-09-02 15:54, inside that window. Its content is not human: 117 changed lines in `tools/lib/surplus-fall/readout.ts` written in the house voice, including "a rung Alan is told about would have been a rung nothing else in the system stands on", and its stated reason for the change — collapsing the markdown `readouts/` catalog into the akasha page population — is migration work. Four of the other six carry migration subjects of the same kind. Two later commits, `cd3446b26a` and `03d97bc5b0`, both carrying session trailers, edited the same file after it, so the swarm had already been rewriting the file the test would have fenced off. The discriminator\'s failure mode is the safe direction — it over-protects rather than under-protects — but a worker that obeys it literally on this block stops on `tools/lib/surplus-fall/readout.ts` for no reason.',
} as const satisfies Finding
