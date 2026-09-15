
# When code runs through the code repo

> The rule Alan landed on 2026-08-11 for which repository carries a piece of code — if it deploys to the cluster it runs through the code repo, and if it does not, it should not. Records his reasoning from the cost of a failed deploy, the ops command as the worked example that separates the two senses of "deploys", and the documents the rule landed on.

The question, once I had it in a form concrete enough to answer:

> I think the right question in this case is "when should code run through the code repo?" This question is concrete enough to have answers.

The answer:

> If the code deploys to the cluster, it runs through the code repo.

## Why that is the line

> In this case, the cost is that failed changes cost the time of the deploy itself, which is slow enough that its worth a more robust process, but even more than that, the code repo mechanics are just the mechanisms used to deploy to the cluster, and the checks in that flow are the ones we've decided individually cost less in delay than the benefit they provide in preventing failure (there is a generalizable piece there).

Two arguments, and the second is the stronger. The first is that a failed change costs the time of the deploy, and a deploy is slow enough to be worth guarding. The second is that the code repo's machinery *is* the deploy mechanism — the checks in it exist because each one costs less in delay than it saves in prevented failure, and that calculation was made for code that deploys.

So the inverse follows:

> So, since deploying to the cluster is expensive, we shouldn't send changes that don't deploy to the cluster through the code-repo machinery.

## The worked example

> Ops is a great example here. The ops command itself DOES NOT deploy to the cluster, it runs locally on the workstation. As a result, the ops command should NOT be in the code repo, despite the fact that it runs the machinery that deploys the code repo to production. This is the most clarity I've had here, so we likely need definition updates for both code-repo and instructions-repo at a minimum to catch up.

`ops` is the case that makes the rule sharp, because it drives deploys without being deployed. Those are two different things and the word "deploys" hides the difference:

> "deploys" here has two different senses being conflated that have different answers.

The sense that decides which repository carries the code is **where the code itself is delivered**, not what the code does. Code that drives a deploy from my workstation and never leaves it is workstation code.

## Where it landed

The rule became a theme, `delivery-boundary`, on the `global` domain:

> No code that runs only on this workstation stands in the code repository. Where a change is delivered decides which repository carries it. A deploy pipeline around code that never leaves this workstation buys nothing and is paid for on every later fix.

I asked whether that was the whole of it:

> yes, and I think that's the only objective? unless we want to explicitly list the inverse as an objective

> Ah, I was thinking of "No code deployed off the workstation is in the instructions repo."

That inverse landed as a Design line on the instructions repo rather than as a second objective. And an Intent line landed on `global`:

> Only code deployed off this workstation passes through the code repository.

## What the rule does not decide by itself

Applying the rule to the actual tree turned up cases it does not settle on its own reading, and I ruled out two shortcuts for finding them.

The first shortcut was namespaces:

> Okay, namespace isn't sufficient to determine if they are deployed or not, but its a useful way to gather some candidates, lets go through these one at a time.

The second was treating "emits configuration" as evidence that something is not deployed:

> I'm not certain, and just because one of these emits yaml files doesn't mean it isn't code deployed to the cluster. We frequently generate files on demand in the cluster itself, so those would fit the code/ repo.

> There likely is some code around cluster bootstrap that might pass the test, but I bet its less than you're guessing.

So generating files is not the test, and neither is where a package sits in the tree. What survives the rule is expected to be a small amount of cluster bootstrap code rather than a whole package group.

---

*Recorder's reading, marked.* The generalizable piece he flagged in passing — "(there is a generalizable piece there)" — is the most portable idea on this page.

The claim is that a check earns its place when it costs less in delay than it saves in prevented failure, and that this is a per-check calculation made against a particular cost of failure. The code repo's checks were each justified against the cost of a failed cluster deploy. Move the same code somewhere the cost of failure is a re-run on the workstation, and every one of those calculations has to be redone — most will come out the other way. That is a general test for whether any process belongs on any piece of work.

The interviewer drew one consequence out of it in the same exchange, and it is hers rather than his: that the code repo is therefore not a quality bar but the cluster's delivery path, its checks being not a standard someone set for good code but the ones that survived a cost test on that particular path — which makes both repositories delivery paths, each gated by what failure costs on it, so that moving work out of the code repo loosens nothing. He did not dispute it, and he answered the turn it appeared in with the `ops` example above, but he never restated it in his own words.

Where the line falls for code that is neither plainly workstation-only nor plainly deployed was left open here in three cases: shared libraries consumed by both sides, code that runs on the workstation but configures the cluster, and code that runs in CI. He settled the third later the same day and, in settling it, changed how the other two get answered — see [009](009-the-boundary-is-a-reachability-question.book-chapter.md).
