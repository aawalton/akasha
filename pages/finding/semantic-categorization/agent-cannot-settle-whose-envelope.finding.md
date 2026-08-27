---
id: 9113b04d-0206-591c-9e50-570283a7ba2f
page-type-slug: finding
title: "Agent cannot settle whose envelope"
domain-slug: domain/semantic-categorization
---

# Claim

An agent cannot settle which person's envelope a purchase belongs to, and it does not reliably know that it cannot.

# Evidence

Measured on 150 held-out transactions whose standing category is a per-person envelope — Jenny's Spending, Alan's Spending, each child's Spending, Tithing, Doing Good and the rest — drawn before any prompt was written and read once. Sonnet, given date, amount, merchant, raw statement and account.

It agreed with Jenny on 15.3% of them (23/150). Jenny's Spending was 4.3% (2/46), Jenny's Travel 0% (0/10), Joseph's Spending 0% (0/5).

Where it went instead is the tell: 36 of Jenny's Spending, 17 of Alan's and 7 of Lizzy's became `Shopping`. It read the purchase correctly and had no way to read the envelope, because the envelope is not in the transaction.

It mostly declines, which is the half that works — only 4.7% of the stratum came back `high`. But of those 7, it was right 3 times. A coin flip at the confidence level that means "apply this without asking".

Four it was confident and wrong about, with its own reasoning attached:

- `SQ *THE WASH` — Jenny: Jenny's Spending. Agent: Auto, "The Wash is a car wash service."
- `PERIFIT.CO` — Jenny: Jenny's Spending. Agent: Medical, "Perifit is a pelvic floor medical device."
- `Home Depot` — Jenny: Jenny's Spending. Agent: House, "Home Depot purchase."
- `VERCEL` — Jenny: Alan's Spending. Agent: Entrepreneurship, "tied to a side project."

Every one of those readings is correct about what was bought and wrong about whose budget it came out of. That is Alan's ruling measured: a category is partly a choice about which budget the money lands in rather than only a fact about what was bought.

This stratum is 1215 of the 6409 scorable transactions, so 19% of the population is closed to an agent on present evidence.
