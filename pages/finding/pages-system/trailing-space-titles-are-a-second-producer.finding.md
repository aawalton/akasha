---
id: e8a5b508-e5cc-5ad2-8f29-4ffa5ab9cc99
page-type-slug: finding
title: "Trailing space titles are a second producer"
domain-slug: domain/pages-system
---

# Claim

338 live `story-chapter` rows carry a title ending in a space, and the population is still growing — 333 ten days ago. It is a different mechanism from the 19 rows ending in a newline, which a heredoc appends: a heredoc cannot append a space. A sweep written against `title ~ '\s$'` merges the two, so a claim about trailing-whitespace titles says nothing until it names the trailing byte.

# Evidence

Measured live 2026-08-07 through `ops db psql`, splitting the estate-wide `title ~ '\s$'` population on the trailing byte over `pages` with `deleted_at IS NULL`:

    SPACE  story-chapter        338
    LF     project               17
    SPACE  monarch-transaction    7
    SPACE  monarch-merchant       5
    SPACE  error                  3
    TAB    story-chapter          2
    SPACE  calendar-event         2
    LF     migration              2
    SPACE  author                 1

THE TWO MECHANISMS ARE STILL SEPARATE. A heredoc appends `\n` and cannot append a space or a tab, so the 356 SPACE/TAB rows are not the `*-file` heredoc mechanism and are not repaired by anything that fixes it.

THE SPACE PRODUCER IS LIVE. A reading taken 2026-07-28 recorded 333 `story-chapter` SPACE rows; today it is 338. Growth over ten days, which is a producer rather than a historical spill. That earlier reading also recorded 10 `agent` LF rows and 2 `project`; today `agent` is 0 and `project` is 17, so the LF side has moved too and in the other direction.

WHAT THE PREDICATE COSTS. `\s$` is one character class over two unrelated causes. A check or sweep written on it reports one number, and repairing either cause moves that number without closing the other — which is how a repaired heredoc reads as partial progress on a producer it never touched.

NOT MEASURED. What appends the space. One measurement cannot name the producer, and `story-chapter` rows are written by more than one path.
