import type { Finding } from "../finding.page-type.types.ts"

export const anActIsTakenAwayOnlyAfterAHandEditTheLandingDiscards = {
  id: "01a0876f-357e-7549-9ed7-a05754deba39",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "an-act-is-taken-away-only-after-a-hand-edit-the-landing-discards",
  domain: "domain/change-agent-file",
  claim:
    "Taking an agent change away is refused while the address map beside `agent-change-running` still imports that change's code. The map is machine-written and its own property page says the landing writes it rather than an author. So the only way through is to edit the map by hand, and the landing then throws that edit away and writes the map again from the addresses reached. The hand edit exists to get past a refusal and for nothing else.",
  evidence:
    'Measured 2026-09-09 taking `merge-eso-day-into-day` away, a change built for one job and removed once that job was done.\n\nA removal drafted on its own is refused: "`changes/runners/pages/agent-change-running/agent-change-running.change-runner.addressed.ts` imports `changes/agent/file/merge-eso-day-into-day/merge-eso-day-into-day.change-agent.code.ts`, and `changes/agent/file/merge-eso-day-into-day/merge-eso-day-into-day.change-agent.code.ts` holds no body after".\n\nThe map\'s property page states "The map is written by the landing rather than by an author or by a command." and "Nothing the map holds survives into the code that runs."\n\nA `change-file` cutting the three lines the map holds for that address, drafted before the removal, lets the removal draft. The apply then answers "...addressed.ts is dropped — that body is written again on every apply" and afterwards "...addressed.ts was written again from the 35 addresses reached", landing at fef538c658. The hand edit was dropped and the map came out right either way.\n\nSo the refusal is drawn by a body no author owns, and cleared by an edit no landing keeps.',
} as const satisfies Finding
