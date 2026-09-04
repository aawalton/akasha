import type { Finding } from "../finding.page-type.ts"

export const nothingSchedulesTheAuditThatMechanicalChangesAreOwed = {
  id: "01a06065-7e0c-7e88-9701-7e1ac5e3b878",
  pageTypeSlug: "finding",
  slug: "nothing-schedules-the-audit-that-mechanical-changes-are-owed",
  domainSlug: "workspace-package/checks",
  claim:
    "`change-mechanical` carries a gap invariant reading `A fault a mechanical change lands is found by the audit.` Nothing runs the audit. No systemd timer, no unit, no service and no workflow calls `akasha audit`, so the promise is empty: a mechanical change is judged by nothing at the gate and by nothing afterwards. Seven commands name that kind — move, remove, refactor, seat and three temper generators — and `landedMechanically` is reached by the seat, subagent and reminder writers besides.",
  evidence:
    "Measured 2026-09-02 on Alan's workstation. `systemctl --user list-timers --all` lists 25 timers and `systemctl list-timers --all` lists 8; not one activates a unit that runs `akasha audit`. `systemctl --user list-unit-files` and `systemctl list-unit-files` match nothing on `akasha` beyond the three kernel `audit*` units, which are auditd. Every `ExecStart=` across the 40 unit files under `~/.config/systemd/user` was read: eight name a path under `akasha/`, and all eight are readout relays, the monarch harness or the pages service. Grepping the whole tree for `akasha audit` finds it in exactly four places outside git's own logs: `infra/cluster-checks/src/lib/retired.ts:17`, where it is help text; the `block-typecheck` agent hook, which suggests the call to an agent that ran tsc; two findings; and `audit.command.test.ts`. None of them schedules anything. `services/` holds 30 daemons and none is an auditor. The call taken here: this lane closed the gap the other way for one path, by adding a fourth change kind that runs the checks at the gate rather than trusting an audit to catch what a mechanical change lands, and it did not build a scheduler. Whether the audit should be scheduled at all is Alan's to say; what is settled is that today it is not, and every invariant resting on it rests on nothing.",
} as const satisfies Finding
