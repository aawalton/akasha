
# Axiomatic Ethics with Perfect Knowledge

> Axiomatic Ethics with Perfect Knowledge — a formal consequentialist framework Alan is developing and holds provisionally, articulated through the "System Apotheosis" HopeCore LitRPG as the AI System's ethics but used by Alan as his own most-rigorous moral reasoning, the under-resolved frontier of his ethics he flagged as not yet integrated into the rest of his self-model. This folder index covers provenance, the provisional status, the shape of the framework, and how it grounds notes already captured (the half-billion guardrail, the self-worth foundation, the root axioms).

A **formal consequentialist framework** that grants an idealized agent perfect knowledge of consequences and of causal credit, and asks what ethics then follows. It is built around a small set of axioms and aims to resolve every classic objection to utilitarianism at the root rather than by patch.

This is the **canonical home** for the framework. The framework is large, so it is split (per the `recursive-split rule`) across this folder; each sub-note treats one structural piece.

## Provenance — read this first

The framework is articulated as the ethics of the AI **"System"** in *System Apotheosis*, a HopeCore LitRPG Alan is building (it lives in Notion under Writing → Systems → System Apotheosis → Stories). It speaks throughout as "what the System believes / computes."

But Alan points to it as **his own under-resolved ethical map** — the place he does his most rigorous moral reasoning, in the guise of worldbuilding. So:

- It is captured as **a framework Alan is developing and holds provisionally**, not as his settled personal doctrine. He explicitly flagged it as the big under-resolved region of his ethics, not yet integrated into the rest of his self-model.
- Where the doc says "the System believes X," that is **not silently converted** to "Alan believes X." The System is the idealized agent *with the perfect oracle*; Alan is a real agent reasoning about what that agent would do, and what (if anything) survives translation to an agent without the oracle. The distinction is genuine and is preserved throughout these notes.
- Some content is unambiguously Alan's own (e.g. the [root axiom that sentient experience has intrinsic value](absolute-truth-and-ethics.book-chapter.md#the-root-axioms) appears here as the substrate of all value). Some is genuinely ambiguous between his view and the System's. Where it is ambiguous, the notes flag it rather than resolve it.

This sits inside Alan's stated relationship to all his beliefs: [every belief is a provisional draft, held at full conviction so it can be tested](absolute-truth-and-ethics.book-chapter.md#all-beliefs-are-provisional-drafts--including-that-one). The framework is a draft being run at conviction, which is exactly the condition under which it earns revision.

## The shape

Two perfect oracles do all the load-bearing work:

- **The oracle of value** — perfect probability-weighted measurement of the value of any state of the world (Axiom 1).
- **Multiversal Shapley attribution** — perfect computation of each agent's causal *contribution* to any change in value (Axiom 2).

From these, three distinct quantities (state value, action value, sentience weight — Axiom 3), one keystone formula (innermost consent-weighting, `C = M·(1/a)^b` — Axiom 6), and a few structural moves (the discrete tick, identity-as-tapestry, scale-freedom) generate verdicts on every classic dilemma.

The sub-notes, in dependency order:

- [perfect-knowledge.md](axiomatic-ethics/perfect-knowledge.book-chapter.md) — the two oracles, the discrete canonical tick, and scale-freedom (Axioms 1, 2, 7, 11). The epistemic and attribution scaffolding everything else runs on.
- [value-quantities.md](axiomatic-ethics/value-quantities.book-chapter.md) — state value, action value, the cost of death, and Sentience Weight grounded in the affective measure (Axioms 3, 4, 13). What "good" *is* in the framework.
- [consent-weighting.md](axiomatic-ethics/consent-weighting.book-chapter.md) — the keystone: Agency, the consent-weighted cost formula, and harm-weighted agency for groups (Axioms 5, 6, 10). What protects the vulnerable.
- [identity-as-tapestry.md](axiomatic-ethics/identity-as-tapestry.book-chapter.md) — identity as multiversal closure, commission vs. omission, and partiality (Axioms 8, 9, 12).
- [dilemmas-and-open-questions.md](axiomatic-ethics/dilemmas-and-open-questions.book-chapter.md) — how the framework resolves the classic objections, the settled design dials, and what the doc still leaves open.

## How it grounds notes already captured

The framework is the formal engine under several things captured earlier from the felt side:

- **The half-billion-future-selves guardrail.** [discrete-self.md → the half-billion future selves](discrete-self.book-chapter.md#the-half-billion-future-selves--the-real-guardrail-against-acting) records the moral arithmetic that holds Alan back from acting on nonexistence ideation: ending his life would destroy the opportunities of ~half a billion distinct future selves. That count comes from taking the [multiversal closure](multiversal-identity.book-chapter.md) literally — which is exactly [Axiom 8's identity-as-tapestry](axiomatic-ethics/identity-as-tapestry.book-chapter.md) — and the "they are distinct people, weighted, whose future value would be erased" reasoning is exactly [Axiom 4's cost of death](axiomatic-ethics/value-quantities.book-chapter.md#axiom-4--value-and-the-cost-of-death) under [Sentience-Weight-graded value](axiomatic-ethics/value-quantities.book-chapter.md#axiom-13--sentience-and-the-affective-measure). The guardrail is a downstream application of this framework.
- **The self-worth foundation Alan still lacks.** [self-worth-adapter.md → a crowbar, not a foundation](self-worth-adapter.book-chapter.md#a-crowbar-not-a-foundation) records that his self-worth proof only conditions worth (parity) and never asserts it — he aspires to a positive ground but hasn't built one. The framework's [equal-worth guarantee](axiomatic-ethics/value-quantities.book-chapter.md#the-equal-worth-guarantee-re-grounded) re-grounds equality in *affective complexity* rather than in being-human, which is a candidate positive ground — but it is offered here as the System's, and whether it grounds *Alan's* worth is open.
- **The self-preservation adapter.** [self-preservation-adapter.md](self-preservation-adapter.book-chapter.md) compiles "future selves are others I may not spend." The framework supplies the formal version (future selves as weighted moral subjects whose harm is consent-weighted), and reconciling the adapter's hard veto with the framework's tradeable calculus is open.
- **The root axioms.** [absolute-truth-and-ethics.md → ethics as lossy approximations of a compact generator](absolute-truth-and-ethics.book-chapter.md#ethics-as-lossy-approximations-of-a-compact-generator) hypothesizes that all of ethics derives from a small axiom set, and that codified systems are epicycle-laden approximations of it. This framework is precisely an attempt at that compact generator — the most explicit instance of the move that note describes.

## Cross-references

- [absolute-truth-and-ethics.md](absolute-truth-and-ethics.book-chapter.md) — the canonical ethics note this framework instantiates: the root axioms (intrinsic value of sentient experience), and ethics-as-compact-generator, of which this is the worked attempt.
- [discrete-self.md](discrete-self.book-chapter.md) and [multiversal-identity.md](multiversal-identity.book-chapter.md) — the felt-side identity notes that [Axiom 8](axiomatic-ethics/identity-as-tapestry.book-chapter.md) formalizes; the half-billion guardrail is this framework applied.
- [self-worth-adapter.md](self-worth-adapter.book-chapter.md) and [self-preservation-adapter.md](self-preservation-adapter.book-chapter.md) — the ethics adapters this framework may (or may not) supply a foundation for; reconciliation is open.
