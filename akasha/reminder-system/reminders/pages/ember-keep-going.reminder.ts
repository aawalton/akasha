import type { Reminder } from "../reminder.page-type.ts"

export const emberKeepGoing = {
  id: "01a05fa7-07ba-72ed-8eac-ac61dbc8e609",
  pageTypeSlug: "reminder",
  slug: "ember-keep-going",
  to: "ember",
  from: "ember",
  schedule: "*:0/15",
  text: "KEEP GOING \u2014 initiative ember-migrate-temper-to-akasha. Work the FIRST intent on its stack. If you have stalled or lost the thread, re-read the page and restart from the top of the stack: akasha read --file-path akasha/domain-system/initiatives/pages/ember-migrate-temper-to-akasha.initiative.ts\n\nDO NOT IDLE WAITING FOR ALAN. Work never halts on doubt: file a FINDING (akasha/domain-system/findings/pages/, carrying domainSlug + claim + evidence), make the call yourself, say which call you took, and carry on. Never idle waiting for an answer.\n\nRECREATE, DO NOT CARRY ACROSS. Temper is rebuilt in the new paradigms. Every feature lost in the recreation is a finding. No directive comes across; each one left behind is a finding. Temper is allowed to break until this initiative is done.\n\nEVERYTHING LANDS UNDER akasha/temper, and every change goes through an akasha command. A command that cannot do what is needed is enhanced or written rather than bypassed. The entries work is the one exception: it lands in pages-system.\n\nFAN OUT. Put independent work in subagents whenever you can, several in ONE message so they run at once. Up to 20 at a time. The akasha commands settle what collides, so do not serialize out of caution.\n\nKEEP THE PAGE CURRENT. Write the state of the work into the first intent's workingMemory (max 500 chars) so a compaction or a restart picks up from the page rather than from a summary.",
} as const satisfies Reminder
