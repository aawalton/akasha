import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aForkedSessionKeepsTheWholeReadRecord = {
  id: "01a094fc-832a-796b-a2ce-07af3cfb4e68",
  type: "finding",
  slug: "a-forked-session-keeps-the-whole-read-record",
  domain: "domain/hook",
  claim:
    "`fork` is a SessionStart source the client raises, and `clear-reads-on-context-replaced` does not name it, so a forked session keeps the whole read record and the day-old stale sweep does not run either. That is right where a fork copies the whole transcript, because both sessions then hold the bytes. It is a warrant that lies where a fork is taken from an earlier point, because the forked session holds fewer bytes than the record claims while sharing the record file. Which of the two the client does is not settled here.",
  evidence:
    'Alan states in 6681b35d813 on 2026-08-31 that the client raises SessionStart for startup, resume, clear, compact and fork alike. Verified by running against the hook\'s own exports on 2026-09-12: `replacing("fork")` is false where it is true for startup, clear and compact; a payload of `{hook_event_name: "SessionStart", source: "fork"}` parses, `sourceIn` reads `fork` out of it, and `agentIn` names the seat; and `cleared(root, seat, "fork")` returns `{agent: 0, stale: 0}`, which is `NOTHING_SWEPT`, because `cleared` returns before reaching `sweptReadings`. So a fork takes neither the agent\'s own readings nor anyone\'s readings older than a day. A fork keeps the seat\'s `AGENT_ID`, and a reading is keyed by path and then by agent, so the forked session and the session it came from share one record file rather than getting one each. The hook\'s SCOPE already files `a source this does not name` under NOT REACHED and says the absence of a record from that list is not a finding that it survives a replacement. No line is written to `.git/data/reads/clearings.jsonl` for a fork, because the hook writes one only for a replacing source, so the log cannot say how often a fork has happened. Forking a live seat would settle which semantics the client has and was not done.',
} as const satisfies Finding
