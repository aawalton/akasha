export const CAPTURED_STATES: Readonly<Record<string, string>> = {
  "agent-tree":
    '{"roots":[{"kind":"root","key":"root","label":"agents","at":null,"color":null,"live":false,"stopped":false,"place":null,"state":null,"waitingOn":null,"children":[{"key":"01a0c43b-c850-7000-bf18-1f9984f6d268","label":"akasha","at":"/var/home/walton/repos/akasha/agent/seat/pages/akasha/akasha.seat.ts","color":"blue","kind":"seat","live":true,"stopped":false,"place":"interactive","state":"idle-pending","waitingOn":"live-subagent","children":[{"key":"a0a01ce7ecd270588","label":"general-purpose","at":"/var/home/walton/repos/akasha/agent/subagent/pages/akasha-a0a01ce7ecd270588/akasha-a0a01ce7ecd270588.subagent.ts","color":"green","kind":"subagent","live":true,"stopped":false,"place":null,"state":"working","waitingOn":null,"children":[]}]}]}],"alanPrincipalCount":8,"runningCount":24,"unreadSeats":0}',
  "command-tree":
    '{"roots":[{"kind":"root","key":"root","label":"commands","called":"akasha","at":null,"color":null,"detail":null,"children":[{"key":"namespace/agent","label":"akasha agent","at":"/var/home/walton/repos/akasha/command/pages/agent/agent.namespace.ts","color":null,"kind":"namespace","called":"agent","detail":"the agents at work and the pages each one has","children":[{"key":"command/agent-strays","label":"akasha agent strays","at":"/var/home/walton/repos/akasha/command/pages/agent/strays/agent-strays.command.ts","color":null,"kind":"command","called":"agent-strays","detail":"the command naming every live process left running by a subagent that has returned","children":[]}]}]}],"unreached":[]}',
  "domain-tree":
    '{"roots":[{"key":"domain/akasha","label":"domain/akasha","at":"/var/home/walton/repos/akasha/akasha.domain.ts","color":null,"persona":"akasha","position":null,"children":[{"key":"domain/alan","label":"domain/alan","at":"/var/home/walton/repos/akasha/alan/alan.domain.ts","color":null,"persona":null,"position":1,"children":[]}]}],"unreached":[]}',
  "finding-tree": '{"roots":[],"unreached":[]}',
  "gap-tree":
    '{"roots":[{"key":"domain/akasha","label":"domain/akasha","at":"/var/home/walton/repos/akasha/akasha.domain.ts","color":null,"gaps":10,"children":[{"key":"domain/alan","label":"domain/alan","at":"/var/home/walton/repos/akasha/alan/alan.domain.ts","color":null,"gaps":1,"children":[]}]}],"unreached":[]}',
  "page-tree":
    '{"roots":[{"key":"type/page","label":"page","at":"/var/home/walton/repos/akasha/page/page.page-type.ts","color":null,"detail":null,"children":[{"key":"type/agent","label":"agent","at":"/var/home/walton/repos/akasha/agent/agent.page-type.ts","color":null,"detail":null,"children":[]}]}],"unreached":[]}',
  "refusal-tree":
    '{"roots":[{"key":"domain/akasha","label":"domain/akasha","at":"/var/home/walton/repos/akasha/akasha.domain.ts","color":null,"refusals":11606,"children":[{"key":"domain/alan","label":"domain/alan","at":"/var/home/walton/repos/akasha/alan/alan.domain.ts","color":null,"refusals":1500,"children":[]}]}],"unreached":[]}',
  "service-tree":
    '{"roots":[{"kind":"root","key":"root","label":"services","at":null,"color":null,"detail":null,"children":[]}]}',
  "status-bar":
    '{"workstation":{"processor":66,"memory":88},"usage":{"sessionPct":38.54545454545455,"weeklyPct":25.818181818181817},"inbox":{"glyphs":"🔵🟡🔵🔵🟢⚫","legend":"Email 0 messages · Tasks 3 tasks · Temper 0 tasks · Findings 0 findings · Gaps 10 gaps · Refusals 11606 refusals"},"upkeep":{"glyphs":"🔵🔵🟢🟡","legend":"Safety 4 levels · Surplus 7.2 hours · Capacity 10 hours · Sleep 7.2 hours"},"attributes":{"glyphs":"⚫⚫⚫⚫⚫⚫⚫","legend":"STR 0 points · END 0.0 points · CON 0 points · WIS 0 points · INT 0 points · CHA 0 points · LCK 0 points"}}',
  "terminal-tabs":
    '{"seatByShellPid":{"876856":"alan","3606469":"akasha"},"colorBySeat":{"akasha":"blue","alan":"green"}}',
  "work-tree":
    '{"roots":[{"kind":"root","key":"root","label":"work","at":null,"color":null,"detail":null,"note":null,"children":[{"kind":"initiative","key":"akasha-gaps-to-zero","label":"akasha-gaps-to-zero","at":"/var/home/walton/repos/akasha/domain/initiative/pages/akasha-gaps-to-zero.initiative.ts","color":"blue","detail":"persona/akasha","note":null,"children":[{"kind":"intent","key":"akasha-gaps-to-zero#1","label":"No gap decision is left.","at":"/var/home/walton/repos/akasha/domain/initiative/pages/akasha-gaps-to-zero.initiative.ts","color":null,"detail":null,"note":"Second run with Alan is under way, in Gaps panel order.","children":[]}]}]}]}',
}
