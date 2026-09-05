// THE FIELDS EVERY TREE ROW CARRIES, HELD IN ONE PLACE SO FOUR TREES SPELL THEM ONE WAY.
//
// Before this, four panels each named a row of their own and no two agreed: what told a row apart
// was `id`, `key`, `slug` and `id`; the text drawn was `name`, `label`, `slug` and `label`; the
// document was `at` absolute, `relPath` relative twice, and a `"repo:path"` pair. A reader had to
// know which tree it held before it could read a field off a row.
//
// Children are left to each tree rather than declared here, because a tree's own row type is what
// its children are, and a base naming `TreeRow[]` would lose the fields the tree added.

declare type TreeRow = {
  readonly key: string
  readonly label: string
  readonly at: string | null
  readonly color: string | null
}
