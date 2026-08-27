---
id: 9ebb03da-748f-55a3-9357-bb2a4085cb13
page-type-slug: task
title: "Change category rules"
slug: change-category-rules
domain-parent-slug: rules-engine-rule-set/category-rule
required-reading-slugs:
  - page-type/task
---

# Definition

- **Change category rules** — turning a transaction the rules got wrong into a change to the set they are.

# Sequence

1. **What the transaction should have counted as.**
   - **Say** which rows are wrong and what each should have been, and check whether they share a merchant, an account or a sign. One row is an anecdote, and the shape they share is what a rule can be written to.
   - **Read** the bank's own words on each row rather than the title Monarch shows. Monarch retitles without telling anyone, so a shape you take from a title is one you cannot match on.

2. **What the set already does with them.**
   - **Read** every rule naming the same merchant, across `pages/category-rule-code/` and `pages/category-rule-agent/`. The folder is the kind rather than a key, and the set is proven whole, so what you write is judged against all of them.
   - **Find** out whether the merchant exists in `pages/category-rule-merchant/merchants.category-rule-merchant.md` at all. A row whose words normalize to no merchant cannot be matched on one, and adding the merchant is a change to the whole set rather than a step on the way to this rule.

3. **The rule, or the edit to one already standing.**
   - **Widen** a rule that already names the merchant rather than adding one beside it. Two rules for one merchant are what later disagree, and the proof reports that as an overlap rather than as the duplication it is.
   - **Write** a code rule where the same row always deserves the same category, and an agent rule where the category turns on what the row means. Naming a category in `category:` is what decides one; naming none hands the row on.
   - **Match** on `merchant`, `description`, `account`, `sign`, `amount`, `date` or `month`, comparing with `is`, `starts with`, `ends with`, `contains`, `is above` or `on or after`. A field's type decides which of those it takes, and there is no regular expression among them.
   - **Set** `counterpart-within-days` only where the row is one leg of a movement between two accounts. A counterpart rides along with the row it pairs to, so a rule that pairs can write a transaction dated further back than the run's own window.

4. **Landing it, and the set still being a partition.**
   - **Compose** the file outside the repository and land it through `ops instructions write`, which gates it against the page type and every document required for the path.
   - **Run** `ops instructions run-checks category-rules-disjoint category-rules-cover` and read what each names. A rule can break the partition while the write is admitted: an overlap names a pair rather than a culprit, and a gap names a transaction nothing claims.
   - **Say** what still has to be done by hand. The run on that sync reaches only the recent end of the history, so a rule written from a backlog leaves that backlog exactly where it was.

# Invariants

- **The documents are what runs.** The sync reads the files under `pages/category-rule-code/` and `pages/category-rule-agent/` directly, so a rule is in force the moment it lands and gone the moment it is taken away. Nothing has to be entered anywhere after the write.
- **A merchant added to `pages/category-rule-merchant/merchants.category-rule-merchant.md` is a change to every rule at once.** The longest matching pattern wins, so a pattern longer than one already standing quietly takes rows off the merchant that used to claim them — and the rules naming that merchant stop firing on rows they had been catching for months, with nothing failing.
