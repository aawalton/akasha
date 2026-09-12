import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const theKindsOfWorkACeilingWouldBeStatedForAreNoPages = {
  id: "01a09576-9232-76f5-993e-6f8859bdec4e",
  type: "finding",
  slug: "the-kinds-of-work-a-ceiling-would-be-stated-for-are-no-pages",
  domain: "domain/memory-limit",
  claim:
    "A ceiling per kind of work is asked for, and the kinds are nothing the repository has. The phase a cost record carries is a bare string written from a different constant at each call site, and the values on disk mix kinds of work with hook event names while naming neither a check nor a guard. Three of the eight kinds have a page with an empty ceiling slot waiting. The other five have no page that could hold a ceiling, and the eight sit at four different levels of the graph.",
  evidence:
    "check-cost.module.code.ts declares phase as a bare string on Cost and on Spawned, and takes it as a string parameter in costOf and costRecorded. Nothing validates it. The one union nearby is Phase in checking.module.code.ts, which is change, worktree, deploy and audit, the four moments a check may run rather than a taxonomy of work, so no cost line is ever tagged check.\n\nThe values written come from a constant per call site: CHANGE in change-running, COMMAND in calling, PUT_UP in deploy.command.code.ts, PHASE in weigh-bash-call and again in tests-pass.code-check.decision.code.ts. hook-dispatch.module.code.ts hands the hook event name straight through as the phase, which is how event names come to sit beside kinds of work in the same field.\n\nA search for a page type enumerating the kinds finds none.\n\ntest.code-file-property.ts already states maxCpuSeconds once for every module test in the repository and leaves the memory slot empty. check.module-property-group.ts and audit.module-property-group.ts are the same shape with both slots empty, and their type is ModulePropertyGroupCeilings, so the pages are built to carry ceilings. Check and audit ceilings are nonetheless stated on individual check pages instead.\n\nA change and a guard and a command are described by page-type pages, and PageType has no ceiling property. A deploy is a command page, and Command offers timeout alone. A bash call has no page of its own at all, only the agent-hook page describing the weighing of one.",
} as const satisfies Finding
