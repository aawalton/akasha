---
id: 2b0d1f87-8c90-5956-859c-53f5cd130898
page-type-slug: finding
title: "Contact route doubles as identity proof"
domain-slug: domain/person-identity
---

# Claim

A contact route on a person document is also read as proof of who is speaking, and the two come apart in ordinary household use rather than only under attack.

# Evidence

`tools/document/schemas/person.ts` documents `phone` and `email` as contact routes — where a
person is reached, with the reaching given as the reason for writing them down at all.

`packages/alanwalton/sms/core/src/sms-identity.ts` matches an inbound sender against those
same normalised numbers to decide which person sent it. The field answering "where do I
reach her" is the field answering "is this her".

The two separate without anybody doing anything unusual. A child texting from a parent's
handset satisfies the match and is not that person. A number that changes hands still
matches the person who gave it up. A person reachable at a route nobody has verified
matches as strongly as one reachable at a route that was.

The layer below already draws this distinction. The webhook verifies an Ed25519 signature
before any identity is loaded, which establishes that the transport is honest about which
number sent the message — not which person did.

`domains/tasks/handler/handle-inbound.md` draws the same distinction one level up, ruling
that the server-stamped footer is trusted and the message body is not, because an account
id appearing in the body is an attack rather than a convenience. Nothing states the
equivalent about the route match itself.

Alan has ruled that a contact route match is sufficient for now. This is filed as the
standing cost of that ruling rather than as a case against it.
