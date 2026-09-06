
# The pipeline

> Alan's mental model of change as a pipeline with a nested sub-pipe per foundational layer, stated on 2026-08-11. Records the current capacity of around 100 projects a day, the next milestone for the change-throughput theme (every layer's natural sub-pipe fits inside the whole with room to spare), which sub-pipes are running, and his identification of agent-harness stability as the blocker holding the others shut. Carries a later statement, on 2026-08-17, of the concurrency cap he sets one level above the child-concurrency one: a single session per persona, and so a single line of change per area.

Asked what my one theme means, I gave the model I actually think in:

> I have some mental models here. I think of the flow of change like a pipeline, and each individual workstream as a smaller pipe nested inside the large one. Currently, the full pipeline can handle around 100 projects a day, but each of the foundational layers may have a smaller throughput limit, depending on pacing, what is in the adjacent possible for that area, how much attention I can give to it, etc...

So there is one big pipe and five nested ones, and a layer's own limit is set by its pacing, by what is in the adjacent possible for that area, and by how much attention I can give it.

## The next milestone

> For the theme, my next major milestone is that the full pipeline can fit the natural nested pipelines for each of the foundational layers and still have room to spare. Currently, only the agent-harness and code-harness sub-pipes are running.

Three of the five sub-pipes are dark: **domain-system**, **infra**, and **alan-harness**.

## What is holding the others shut

> I have four against alan-harness, some of those have projects in flight, but those are the agents get stuck, which is what I'm working through with athena, so the agent-harness stability is the blocker preventing the other foundational pipes from flowing now.

Initiatives counted against the five layers, after I corrected the classification of two of them:

- **alan-harness** — 4
- **agent-harness** — 2
- **code-harness** — 2
- **domain-system** — 1
- **infra** — 0

plus `resource-utilization`, which spans all five.

> Interesting, more-than-one-person and persona are actually both alan-harness. So all of the initiatives are in the five layers (plus the global one, which is related to what we're doing now).

So nothing I have defined sits outside the five layers, and the layer with the most defined work stacked against it is the one that delivers into my six values rather than into the machine.

## Why the in-flight queue looks the way it does

> You're missing context here. Most of those projects are children for a single parent, which I'm deliberately limiting to a child concurrency of three, that's the CI stabilization work, which I'm letting trickle so it doesn't flood and destabilize everything else like it did yesterday. Some of the remaining work is the athena projects and the remaining in-flight work is other valuable changes that are getting stuck because of agent instability, so I'm leaving them where they are at the moment as test cases for athena.

Of 89 ready projects, 86 were dalla's — the whole ready queue sits in code-harness, and the other four layers have essentially nothing waiting.

## The throttle above that one

The same instrument, set one level up:

> I limit myself to one session per persona as a natural rate limited to avoid too many concurrent changes in the same area.

Each persona owns exactly one domain, so a session per persona is a line of change per area, and the cap is one.

## Two corrections I made about what the blocker means

The first, on what is actually blocked:

> Correction, there is no next most valuable stream **that depends on agents working autonomously**. I can still make progress in live interactive sessions such as this one, and such as working with a definer to clean up or queue work to be done.

The second, on what question to ask about the queue:

> No, I think your conflating work streams again. If the 89 projects are all in the code-harness queue, the other four foundational layer queues could still benefit from definition work so work is ready to move forward when the pipeline can hold it. Instead, I think the right question is "what work in the five foundational layers would be most impactful and increasing the size of the total pipe?"

And the hypothesis I drew from it:

> That does guide me towards a clear hypothesis though, which is that we should review the in flight work, starting from the top down, and see if that needs to be pulled forward to completion to open space for the next thing.

---

*Recorder's reading, marked.* The two corrections above are the most useful thing on this page and they run against a natural reading of the rest of it.

Agent-harness instability blocks the pipes, so it is tempting to conclude that nothing else can move until it is fixed. He rejected that twice. What is blocked is specifically work that *depends on agents running autonomously*; live interactive sessions still move, and definition work still moves. Since definition is the step where selection actually happens — see [004-inboxes.md](004-inboxes.book-chapter.md) — the upstream half of the system is not blocked at all, and the four layers with empty ready queues could be filled now rather than after the blocker clears.

He also declined the framing that the 89 ready projects represent a backlog to be cleared before anything else starts, on the grounds that they are all in one layer's queue. His replacement question is about the size of the total pipe rather than the contents of any queue.

The throttle above is worth reading beside the child-concurrency cap rather than on its own. They are one practice at two scales, and neither is recorded anywhere the system can read — both are held by hand, by him, at the moment he starts something. This page says a layer's own limit is set by pacing, by what is in the adjacent possible, and by the attention available, three things that sound discovered. Pacing is partly chosen, and this is where the choosing happens.
