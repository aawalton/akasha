---
id: 81cdfdea-5d30-58bf-81f7-2ab007a26bb7
page-type-slug: finding
title: "Send help claims it may wake a stopped seat"
domain-slug: domain/ops-cli
---

# Claim

`ops seat send` opens its help with "This verb DELIVERS, and may start a recipient that is stopped", and a send to a stopped seat does not start it — the row reads `not-yet/unclaimed — offered and not taken`, which is what a message to nobody looks like.

# Evidence

The first sentence of the help is "This verb DELIVERS, and may start a recipient that is stopped." It is the sentence establishing what the verb is for, and it stands above the whole `--blocked` discussion that follows.

19011's manager used `ops seat send` to restart project 19014's stopped seat and treated the send as the restart. It was not. `ops seat delivery` afterwards read `not-yet/unclaimed — offered and not taken`. The seat stayed stopped and 19014 stayed at `understand` with nothing working it, until somebody noticed the project had no seat and spawned a fresh one by hand.

What makes this expensive is that the failure is silent in both directions. The send exits 0 and returns a message id, so the sender has a receipt. The recipient's row records the message as offered, which is true. Nothing anywhere says the recipient never woke, because from the store's side nothing went wrong — a message was written for a seat that is not draining its mailbox, which is the ordinary state of every stopped seat.

So a sender who believes the first line of the help has dispatched work, has a receipt for it, and will find out it never started only by going and looking at the project. That is a class of loss nothing reports: the gap between a delivery attested and a recipient roused.

`--blocked` does not change it. That flag says who is waiting, not who is woken.

Either the sentence is wrong and should go, or the verb should do what it says. The sentence has the weaker claim to stay: "may start" is already hedged to the point of establishing nothing, so a reader who acts on it is acting on a maybe, and a reader who does not is left wondering what the hedge was protecting. A verb that never wakes anybody should say so outright, and name the verb that does.

Not filed against 19011 or 19014. It surfaced there and belongs to whoever owns the send surface.
