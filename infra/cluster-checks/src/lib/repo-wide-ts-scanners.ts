export const ALLOWLISTED_REPO_WIDE_TS_SCANNERS: ReadonlyMap<string, string> = new Map([
  ["typecheck", "tsc -b runs the project-references build over every TS file in the monorepo."],
  ["lint", "biome lints every TS/TSX file in the workspace."],
  [
    "acyclic-imports",
    "Builds the runtime import graph from every TS/TSX file to detect import cycles.",
  ],
  [
    "test-step-paths",
    "Validates per-workspace test-step coverage; the set of test files is over every *.test.ts[x] across the repo.",
  ],
  [
    "reverse-reachability-graph",
    "Produces the per-file reverse reachability artifact consumed by every generated test step; must rebuild whenever any TS source changes.",
  ],
  [
    "functional-type",
    "Validates the functionalType rank-monotonicity rule across every cross-package TS import in the monorepo.",
  ],

  [
    "prose-mechanism-restatement",
    "A doc comment transcribing a function's field set can be written into any source file by anyone, and that is where the population went: the markdown this was seeded on carried no restatement at all while twenty-six stood in comments across agents/, alanwalton/, infra/, shared/ and temper/. A path-scoped population would decide in advance which packages are allowed to keep a second carrier for a fact the type owns.",
  ],
  [
    "unused-deps",
    "Intentional: rereads every importer of every workspace package; tightening would risk stale dep accuracy (comment in source).",
  ],
  [
    "phantom-deps",
    "Walks every TS/TSX import in every workspace to detect phantom (undeclared) dependency usage.",
  ],
  [
    "worker-shape",
    "Per-record predicate over the ts-file population; only `*.worker.ts` files are evaluated, but those can land anywhere in the repo.",
  ],
  [
    "start-script",
    "Per-record predicate over the ts-file population; only the `synth.ts` files the shared discovery globs match are evaluated for `bun run start` container commands, but those can land anywhere in the repo.",
  ],
  [
    "pages-ui-store-sidecar-memory",
    "Per-record predicate over the ts-file population; reads every TypeScript source the `@shared/pages-ui-store` dependents own, looking for `orchestratorCacheSyncSidecar` limits. Narrowing to the deploy manifests was the check's founding defect (#18586) — a sidecar declared in a differently named file beside the synth went unread while the run certified — and a new dependent can be any workspace, so no prefix selects fewer.",
  ],
  [
    "rbac-check-manifests",
    "Reads the content of every manifest a `pipeline-engine` step applies by running the `synth.ts` that emits it (#18631) — the applied files are gitignored `*.generated.yaml` written at CI time, so a synth source is where a change to what is applied arrives, and one can land in any package.",
  ],
  [
    "rbac-check-cluster-resource-names",
    "Runs every discovered `synth.ts` and judges the cluster-scoped RBAC names it emits, so a violation arrives in a synth source; the six discovery globs bottom out at `packages/*/*/deploy/k8s/synth.ts`, so one can land in any package and no prefix selects fewer. The yaml population this replaced named the gitignored `*.generated.yaml`, which has no graph node, so the check woke on 0 of the 50 synth sources it reads (#18630).",
  ],
  [
    "rbac-check-cluster-grants",
    "Same population and same measurement as `rbac-check-cluster-resource-names` above: it runs every discovered `synth.ts` and classifies the kinds emitted, an unmodeled kind or a missing create+patch grant arriving in a synth source that can sit in any package.",
  ],
  [
    "tmpfs-scratch",
    "Walks every TS file to detect scratch creation under tmpfs; a scoped population would be blind to exactly the new sites it exists to catch.",
  ],
  [
    "node-type-registry-sync",
    "A producer-side `*_NODE_TYPE` constant is a plain exported string literal, so it can be written in any TS file and the check judges every TS/TSX node for one; a scoped population would decide in advance where an unjudged node type may live, which is what the four discovery globs it replaced had already done — one glob pair reached a single file, and three constants outside them went unjudged until this widened.",
  ],
  [
    "syntax-bundle",
    "Coalesces the pure-AST scanners of SYNTAX_SCANNER_ENTRIES (../lib/scanner-registry) over the universal TS/TSX population — repo-wide by construction.",
  ],
  [
    "mock-module-surface",
    "Walks every `mock.module(...)` call in every `**/*.test.ts[x]` across the repo.",
  ],
  [
    "mock-module-leak",
    "Walks every `mock.module(...)` call and its co-resident sibling imports across every `**/*.test.ts[x]` in the repo.",
  ],
  [
    "unit-test-io-hermeticity",
    "Walks the runtime import graph of every `{unit,property,component}.test.ts[x]` in the repo to detect reachability of a registered real-IO boundary module.",
  ],

  [
    "k8s-node-selector",
    "Intentional: scans every TS/TSX file for forbidden `kubernetes.io/hostname` string literals (comment in source).",
  ],

  [
    "no-hardcoded-surface",
    "A `bg-surface-N` class string is worth catching wherever it is written, and it is as often written in a `.ts` module a component imports — a hook's toast defaults, a shared constants file — as in the component itself, so narrowing the population by extension would only decide in advance which half of the same act is allowed.",
  ],

  [
    "cli-json-contract-coupling",
    "Walks every `*.test.ts[x]` in the repo for `.strict()` contract schemas with no producer typecheck coupling, and the relative modules the CI-excluded ones import such a schema from; either the test or the module it hoisted the schema into can be written anywhere.",
  ],
  [
    "client-page-access-boundary",
    "Repo-wide walk of every TS/TSX file gated by a leading `use client` prefilter — app `app/` dirs and shared packages alike.",
  ],
  [
    "color-literals",
    "Scans every app source file for hand-rolled color literals across the TS/TSX/CSS populations.",
  ],
  [
    "generated-suffix",
    "Walks every TS/TSX file: a machine-provenance header block can be written in any source file, and the naming rule is about that header.",
  ],
  [
    "guarded-resolve",
    "A guard over a statically-resolvable tracked path can be written in any TS/TSX file, so any TS edit can introduce one; the run itself narrows to the change via `resolveChangeClosure`, but the tracked set it resolves against stays the whole `discoverRepoFiles` population.",
  ],
  [
    "porcelain-status-boundary",
    "Walks every tracked source file to confine `git status` machine-readable acquisition to one module.",
  ],
  [
    "properties-file-key-space",
    "AST walk over every TS/TSX string literal and the comment trivia beside it; a `--properties-file` key-space claim can be written in any command's help text, or in a comment over the field that carries the map.",
  ],
  [
    "supervisor-watch-set",
    "Derives the workspaces the worker-supervisor pod executes — every `*.worker.ts` the pod's own scan root discovers, plus the entrypoints its Deployment names — and refuses a `SUPERVISOR_WORKER_DISPATCH_NODES` that disagrees in either direction. A worker entrypoint can be added under any package, and the violation it creates is the package NOT yet in the watch set, so any seed drawn from the current set or from the packages holding workers today is blind to exactly the file that introduces the defect: the guard would be clean on the commit it exists for.",
  ],
  [
    "instruction-references",
    "A citation of an instructions-repo document is prose, not an import, so it can be written into any TS file and nothing structural marks where one may appear. The sweep that founded this check took fifty-five references out of twenty-four files in four shapes — test names, runtime error messages, ast-unused pragma prose and fixtures — spread across agents/, alanwalton/, infra/ and shared/, so the shortest prefix covering them is `packages/` and selects no fewer files than the unscoped population.",
  ],
  [
    "worker-tick-yield",
    "Derives worker package roots and their tick-reachable files from every `*.worker.ts` in the full ts-file population, and judges each for a loop of any form whose body awaits without yielding to an abort signal. A new worker package, or a new import that pulls a file into a tick, can arrive in any TS file.",
  ],
])
