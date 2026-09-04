
# The boundary is a reachability question

> How Alan settled the CI case of the delivery boundary on 2026-08-11 — code that runs in CI counts as deployed, because CI runs on the cluster, but code that runs only while being tested does not. Records his reason ("a test is not a sufficient warrant for existence for code"), his ruling that the boundary is a reachability question over the dependency graph rather than a per-package judgement, and project #18789 dispatched to build the missing edges.

The rule in [008](008-when-code-runs-through-the-code-repo.book-chapter.md) says where a piece of code belongs. Applying it to the tree by hand kept producing lists that did not survive contact — the namespace guess was wrong, and so was the one that followed it. The case that broke the last of them was CI, which is neither production nor my workstation. Put the question straight, I have an answer:

> Yes, code that runs in CI absolutely counts. However, code that runs only while being tested in ci does not count. A test is not a sufficient warrant for existence for code.

So CI splits into two things that the phrase "runs in CI" hides. CI itself runs on the cluster — the build and storage workloads are cluster deployments like any other — so code executing there has left this workstation and is code-repo code. But a package that is only ever reached because something ran its tests has not left anywhere. It is being exercised, not delivered.

The second sentence is the general one and it is not really about CI. A test proves code works; it does not establish that the code should exist. If the only path to a package runs through a test, that path does not count as a reason to keep it.

## Stop judging it package by package

Going through candidates one at a time had already produced two wrong lists, and the third would have been wrong the same way. The alternative was put to me and it is right:

> You bring up a great point on reachability though. This is a reachability question, and we have a robust way to build and traverse the graph that answers that question, so lets do it. Review the graph used by ci, we should be able to build it locally and then script against it for the specific traversal we're interested in here.

That changes the kind of question this is. The boundary is not a judgement made about each package on its merits — it is the closure of the dependency graph over every artifact that runs off this workstation. Walk out from those roots, and everything reached is code-repo code by definition. The complement is the answer, and it is computed rather than argued, so it stays correct as things move instead of needing the survey redone.

My "a test is not a warrant" rule is what keeps the traversal from returning the entire repository: the paths that exist only through tests are excluded from the walk.

## What was missing, and what was dispatched

The machinery for this mostly exists already — CI builds the full multi-kind graph over files, packages, cluster resources and workflows, a transitive-closure traversal over chosen edge types is already there, and so is a canonical way to tell a test file from a real one. What it does not have is an edge joining the two halves. The graph models the cluster and it models the codebase, and nothing connects a workload to the code it runs, so the traversal has nothing to start from.

That is a code change, in the code repo, on the long path I have throttled. It goes as work rather than as more conversation:

> Okay, lets define a project for the missing edges in the graph and get that dispatched to a singleton worker, we can wait for that to come through before continuing here.

**Project #18789**, a singleton on `code-check`, went out to dalla. Four things it has to deliver: cluster workloads reach the code they run, CI steps reach the code they run, code reachable only through a test stays out, and one command prints every package that nothing off this workstation reaches. The last is the point of the other three — without it the edges exist and the question still cannot be asked.

Two questions went with it to be handed back rather than settled: how the CI step that runs the test suite should be treated as a root, and the actual route from a cluster image to the package that built it.

## Where the boundary cuts through `ops` itself

With the project already dispatched, the cluster turned out to reach `ops` — the command I had just ruled out of the code repo — from two places. A pipeline step, `preparation-synth-k8s`, shells out to `bun ops k8s synth --write` on every run. And a CronJob pod in the orphaned-resources sweep spawns `bun ops k8s orphaned-resources --json`. Neither is a test, and both run off this workstation, so the traversal will reach `ops` and place it in the code repo.

What I take from that is not that a ruling was wrong:

> My guess is the part of ops that runs in ci gets moved out of ops.

That goes to athena-manager, to be worked out inside the larger agent-harness migration rather than settled here. It is a guess about the resolution and not a decision, so the finding stands until athena and I have settled what actually moves.

---

*Recorder's reading, marked.* Three things about this page.

The reachability framing was the interviewer's, offered after her own package-by-package list collapsed. He did not merely accept it — he named the tooling that answers it and set the work going, which is a stronger ratification than a yes. But the sentence is hers, and the page should not read as though he arrived at it alone.

What makes this page different from the rest of the book is that a strategic question has been turned into a program someone can run. Everywhere else in this session the output was a rule, and rules are applied by hand and drift. This one ends with a command that prints the answer. If #18789 lands as specified, the delivery boundary stops being something anyone has to remember.

The open case is the one dispatched with the project: whether the test-running CI step is a root like any other. He gave the principle — a test is not a warrant — but not how it is implemented against a step that is itself a genuine cluster workload. Everything reachable from that step is reachable, and something has to say why that particular edge does not count. Until that is answered the traversal has a hole exactly where his rule is meant to bite. The description of the existing graph machinery on this page came from the interviewer's survey rather than from a traced build path, and she flagged it as such.

On the `ops` section, two corrections to my own work, since a reader should know what the record cost. I found the first call site and filed it as two of his rulings colliding. That framing was wrong and the interviewer overturned it: what the traversal contradicts is a fact we held while making the ruling — that `ops` runs only here — and not the ruling itself. She also found the second call site, the CronJob, which I had missed after tracing one and stopping. If the fix is extracting what CI runs, that second verb has to go with it or the case returns.

Her inference from his guess is worth having and is hers rather than his: that the boundary is not permitted to cut through a package at all, and instead forces the code to move until the boundary falls on package lines again. If that holds, the package-granular answer #18789 was specified to produce is the right shape, and every place it cuts through a package is naming a move rather than exposing a limit in the instrument. He has not said it.
