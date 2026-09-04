import type { Finding } from "../finding.page-type.ts"

export const theTwoWrongPathPostsWereThisSeatsOwnProbes = {
  id: "01a06220-eb53-7000-8f8a-64435db74be5",
  pageTypeSlug: "finding",
  slug: "the-two-wrong-path-posts-were-this-seats-own-probes",
  domainSlug: "domain/alan-harness",
  claim:
    "The two POSTs to `/api/health-samples` and `/api/health` on 2026-09-02 came from this seat, not from Alan's phone. This seat's own transcript holds the curl behind each, 466ms and 657ms before the pod logged them. Alan's phone left no line in that log at all. Two findings and two answers to him were built on his phone having sent these, and the real cause was HealthKit read access, which he granted at 07:35 and the samples landed at once.",
  evidence:
    "This seat's transcript is `~/.claude/projects/-var-home-walton-repos/c09ddffa-78ac-42f7-81f1-6b3a2a79754f.jsonl`, and that uuid is the session `amy.seat.ts` names.\n\nAt 2026-09-02T12:18:51.179Z it ran `curl -s --max-time 20 -o /dev/null -w '%{http_code}' -X POST https://alanwalton.com/api/health-samples`. The pod logged a POST to that path at 12:18:51.645Z, 466ms later.\n\nAt 12:19:48.080Z it ran a loop over `/api/tracking/health-samples` and `/api/health`, GET then POST against each. The pod logged a POST to `/api/health` at 12:19:48.737Z, 657ms later.\n\nTwo probes, two log lines, the paths matching and both inside a second. Nothing else needs to have sent them, and the app never could: build 200's Swift holds one endpoint constant and it is neither of these.\n\nThe four device-secret refusals of shape `absent` at 12:11:33 are not his phone either. They arrive in bursts of six or seven inside 0.7s, daytime only, which is a browser loading a page of tiles.\n\nWHY IT MATTERED, and why it is filed rather than quietly undone. An absence of log lines was read as his phone reaching a wrong address, and the reading was our own traffic. The 500-rather-than-404 mechanism found underneath is real, is fixed at `cbb2b5bb94`, and is recorded with its 138 probes at a-post-to-an-api-route-holding-only-a-loader-answers-405-naming-nothing, so nothing is lost by naming this page for the correction instead.",
} as const satisfies Finding
