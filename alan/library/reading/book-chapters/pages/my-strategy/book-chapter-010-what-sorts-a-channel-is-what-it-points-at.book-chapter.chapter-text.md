
# What sorts a channel is what it points at

> Alan's zoom-out on 2026-08-18, a week after the rest of this book was written. Records the foundational layers going from five to ten, the roughly 80% of throughput channel one is taking with about another week expected, and his correction to the channel split in [001](001-two-channels.book-chapter.md): definition work counts as channel two when it points at an area other than the foundational layers, so the channels divide by what work points at rather than by what kind of work it is. Carries his reason for deleting the change-throughput theme, which was that it stood in for a link every work item now carries directly, his ruling on the two corrections that followed — one taken and one refused — and his own statement of what this session is for, which is finding the current bottlenecks.

A week after the rest of this book was written I came back to the top of it:

> Okay, I'd like to zoom out again. Review books/my-strategy to get oriented on our last conversation, claim domain global and role interviewer, and lets start from the top again.

What a week had done to the record was the first thing put to me, and the reading offered was that channel one had eaten everything while the layer I aimed with went unwritten. That is not what happened, and I said so plainly:

> No, this is working as I expected. I'm anticipating another week or so with channel one occupying ~80% of throughput, but I am getting some parallel throughput now, some through amy on readouts, some through awen on definitions for the game engine and data cleanup.

So the split is chosen and it has a horizon on it. Roughly four fifths of what I can push is going into the ability to push, and I expect that for about another week. The rest is real: two lines running beside it, amy on readouts and awen on definitions for the game engine and on data cleanup.

## The channels divide by target, not by kind

Both of those parallel lines are definition work, and [001](001-two-channels.book-chapter.md) has channel two reaching me through code — the harness is where the prosthetics get built. On that reading, defining what a readout is or what a world holds might be channel one wearing channel two's clothes, and the parallel throughput would be less parallel than it looks.

It is not, and the reason is that definition is not a different kind of activity from delivery:

> Ah, definition is the first stage for code delivery. These are channel 2 because they are for definitions for areas other than the foundation layers (which I think we have 10 of now?)

Definition is the first stage of code delivery, so it is never disqualified from channel two for being definition. What puts a piece of work in channel one is what it points at. Aim it at a foundational layer and it is channel one; aim it anywhere else and it is channel two, whatever stage it happens to be at.

That is a cleaner line than the one in [001](001-two-channels.book-chapter.md), and it survives the case that broke the old one. The old line sorted by the form the work took, which is exactly what two lines of definition work aimed at a game engine and a set of readouts made useless.

## Five layers became ten

The count in the aside is right. There are ten foundational layers now, where [006](006-the-dependency-graph.book-chapter.md) has five: domain-system, pages-system, events-system, graph-system, work-system, ops-cli, agent-harness, code-harness, infra, alan-harness.

Every one of the five that arrived landed in the same place — between domain-system and agent-harness. Nothing was appended and nothing was inserted anywhere else in the ordering. That is exactly the spot [006](006-the-dependency-graph.book-chapter.md) records as the one place the order needed a tie broken, where I said the two were both essential to every change, neither depended on the other in the ordinary way, and I settled it on which could bootstrap on a lighter harness. Read now, it does not look like a tie. It looks like five layers were sitting in that gap unnamed, and the ordering felt level because something was missing rather than because two things were equal.

Whether the list is done, I do not know, and it is not really what I am here for:

> We might fine more, not sure. I think I'm trying to puzzle out where the current bottlenecks are

## Why the change-throughput theme went

A theme named `change-throughput` was deleted on 2026-08-17, and on the corpus's own account a theme is deleted once the intent it quotes is met. The intent it quoted — that more change can be pushed through these layers than there is change waiting to be made in them — still stood as unmet intent on the foundational layers. Put to me as a contradiction, with the direct question of whether capacity is above demand today:

> Yes, I think it technically is, but I deleted change-throughput because I realized it was a proxy for a direct link to priorities, so themes, initiatives, and projects map directly against priorities instead.

Two separate things in that, and only the first is about capacity. Capacity is above demand, technically. But that is not why the theme went. It went because it was a whole object standing in for something that is now a field: themes, initiatives and projects each carry their priority directly, so a theme whose job was to name a priority was a layer of indirection between a piece of work and the priority it serves. Removing it removed the indirection. No aim was dropped.

That is the same motion as several others this week — the book domains folding into the books, readouts into data, pages onto files, the harness into instructions. Fewer places, each holding the thing itself rather than a pointer to it.

## What I repaired and what I left

Two corrections followed from that answer, and both were put to me. The capacity line standing as unmet intent on the foundational layers had to move or go, since I had just said it was true. And the theme page type gives exactly one reason a theme is deleted — once the intent it quotes is met — which is not the reason mine went.

> Do the deletion but not the addition

So the capacity entry is gone from the foundational layers, whose Intent now holds one line. The theme document keeps its single reason.

---

*Recorder's reading, marked.* Four things about this page.

**The framing this session opened on was wrong, and it was the interviewer's.** She put it to him that channel one had eaten everything and the layer he aimed with had stopped being written, resting it on two pillars: that the `my-strategy` domain had vanished, and that the themes had gone. Both fell. The domain was retired deliberately when book domains were consolidated, in a commit that says so, and the two named themes went for reasons of their own. She traced that herself and retracted it to him rather than letting it stand. It is recorded here because his first substantive answer is a rebuttal, and the page would misread without the thing being rebutted. None of it is his.

**Two agents ran the same wrong inference off the same line on the same day, and the line was not at fault so much as incomplete.** `page-types/theme.md` gives exactly one reason a theme is deleted: once the intent it quotes is met. Reading the `change-throughput` deletion against that, the interviewer and I both concluded a completion had been claimed, and I filed a finding stating the contradiction as a clean either/or — the theme went early, or the intent entry was missed. His actual reason was neither, and no reading of the corpus could have produced it, because it had never been written down. The finding is deleted, that being what happens to one when a decision is made about it. This page should not read as though the record was fine and two readers were careless. The record held one reason out of two and gave no sign it was partial, which is the failure that does not announce itself.

**He ruled on both corrections, and the one he refused is the more interesting.** He said the capacity intent is technically met, which by the rule on intent entries means it must move or go the moment anyone finds it true — the warning attached to that rule being that nothing re-reads an entry, so whoever finds it true is the only one who will ever look. Neither the interviewer nor I could make either change ourselves, because a domain's Intent lines and a page type's Design lines are shown to him before they change. Both went to him and he took one. The capacity entry is deleted. The addition to the theme page type — his own deletion reason, written down as a second way a theme ends — he refused, giving no reason and not being asked for one, it being his call inside a limit he set.

So the gap that produced the misreading above is still there, and it is worth being exact about what that means. It is now a gap he has seen and left, which is a different thing from one nobody has looked at, and the next reader of that document meets precisely what the interviewer and I met. That is a ruling rather than a defect, nothing is filed against it, and this page records it as a decision so that whoever trips on the same line later knows the incompleteness is known.

**What he is doing in this session is not what it looks like.** The zoom-out reads as an audit of the record a week on, and much of what is above is record-keeping. His own account is different — he is puzzling out where the current bottlenecks are, and he said it unprompted while declining to commit on whether the layer count is final. The pages either side of this one should be read against that and not against the tidying. On his own numbers the foundational layers are not where the queue is: capacity there is above demand by his word, even at four fifths of throughput, which puts the constraint somewhere in channel two. Where exactly is the open question this page ends on, and the reading that it sits at the definition stage, which runs through him, is the interviewer's rather than his.
