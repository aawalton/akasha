---
id: 571bdadd-2e75-5624-be9e-0eaa5e3e546f
page-type-slug: finding
title: "Two categories cover vehicle spending"
domain-slug: page-type/monarch-category
---

# Claim

`Auto` and `Transportation` are both live categories covering the same kind of spending, and almost everything lands in `Transportation`.

# Evidence

Counting live transaction pages against each category page: `Transportation` carries 141 and `Auto` carries 9.

The collision surfaced while verifying #18119. The agent under evaluation answered `Auto` at high confidence 15 times on held-out rows, and was scored wrong on every one. On 14 of the 15 the standing category was `Transportation`, and the merchants were `Utah DMV`, `Honda`, `Costco Gas`, `COSTCO GAS #0484 OREM UT`, `COSTCO GAS #0733 LEHI UT` and `The Wash` — vehicle spending on any reading. So the agent identified what was bought correctly and chose the rarer of two labels for it, and the evaluation recorded that as a categorization error.

This has two consequences. Any measurement of agreement against this corpus understates an agent by however much of the gap is label collision rather than judgement, so #18119's figures are a floor. And a rule or an agent writing `Auto` would be scattering vehicle spending across two categories that a person reading a budget would expect to be one.

What I did not measure: whether `Auto` and `Transportation` differ deliberately in some way the transactions do not show — the nine `Auto` rows were not inspected to see what distinguishes them, and whether either category is referenced by a Monarch budget or rollup was not checked. Whether any other pair of categories in the list collides the same way was not checked either; this pair was found by following one evaluation result rather than by sweeping the category list.
