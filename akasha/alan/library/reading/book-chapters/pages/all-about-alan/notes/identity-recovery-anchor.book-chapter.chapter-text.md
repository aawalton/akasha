
# Identity-recovery anchor

> Email-as-identity-recovery-anchor — the cascading-dependency pattern where one account controls authentication-recovery for a downstream cluster, why Gmail is the hardest dependency to move, and the OAuth-login vs recovery-anchor split.

A framework concept: the account that every other account falls back to when it needs to re-prove who I am. The recovery anchor is the single hardest piece of my dependency graph to move, and the reason is structural — nearly every other account points back to it to prove identity.

## The pattern

An identity-recovery anchor is an account whose control determines authentication-recovery for a downstream cluster of other accounts. When I lose a password, get locked out, or have to re-prove identity, the reset path terminates at the anchor. Control the anchor, and you can recover everything downstream. Lose the anchor, and the downstream cluster becomes unrecoverable.

This is a cascading dependency, but a specific kind. Generic cascading dependency is "switching A requires switching B." The recovery-anchor shape adds direction: the anchor account is upstream of a fan-out of accounts, and the dependency runs *toward* the anchor. That direction is what makes it load-bearing — and what makes it the maximum-dependency, low-trust spot in my graph.

For me, that anchor is Gmail. It sits at the maximum-dependency spot precisely *because* everything is tied through it. Its graded entry as a SaaS dependency lives in [software-and-saas.md → Gmail](software-and-saas.book-chapter.md#gmail-google) (D, on Google's behavior as parent); this note is the framework home for the anchor pattern itself.

## Two distinct jobs, separable

Gmail does two different things for me, and they come apart cleanly. Conflating them is what makes "move off Google" look like one impossible project instead of two different problems.

### 1. OAuth login — the accept bucket

The universal "sign in with Google" key. A large share of my online presence authenticates through Google's OAuth rather than a stored password.

On this one I'm genuinely stuck, and I've stopped fighting it:

> "there really isn't a viable alternative for OAuth. Google is still the most universal, so I put up with it."

This lands in the **accept bucket**, not the refuse bucket. There is no viable alternative, so I stop spending energy resenting it and carry the cost. The accept/refuse split is the same move the framework makes elsewhere — when no exit exists, the right posture is conscious acceptance, not standing frustration. (The grade-level analog is the D tier in [grading-scale.md → D](grading-scale.book-chapter.md#d--clear-misalignment-but-tolerable): "I see the problem, I am consciously accepting the cost of staying.")

### 2. Recovery anchor — the part I want to replace

The address every other account falls back to when it needs to re-prove identity. This is the job I want to move:

> "the email recovery side I would love to replace and potentially self-host, that's just a really big project."

The two jobs are separable: I can replace the recovery anchor without solving OAuth, and I can keep accepting OAuth without keeping the recovery anchor. They only *look* like one dependency because they live at the same vendor.

## Why it's a "really big project"

This isn't a long to-do list. It's a different animal. The difficulty is on **two axes at once**:

1. **A brutal bar.** The replacement anchor would have to out-reliable Google. Whatever I move recovery to becomes the single point that everything downstream re-proves identity against — so it has to be *more* dependable than what it replaces, not merely adequate. Google's uptime is the floor, not the target.
2. **The hours.** A blast-radius map (which accounts use the anchor for recovery), a cutover ordering that never leaves any one account recoverable only through a half-migrated path, and the self-host build itself.

This is one of a small shelf of big, high-leverage, not-yet projects — the kind that is hard enough on both axes that it doesn't get knocked out in a session.
