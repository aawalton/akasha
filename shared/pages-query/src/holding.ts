import { dropDerivers, holdDerivers } from "../../../tools/lib/deriver-hold.ts"

// Asking whether a page type is answered from the checkout rebuilds a derivation keyed on
// a fresh file tree, and building that key costs a synchronous `git ls-tree` and
// `git diff-index`. A long-lived server asks it on every branch of every read and write,
// so the cost multiplies by the number of page types rather than being paid once.
//
// A server holds its derivations for a bounded window. A command that runs once and exits
// does not, because it would gain nothing and would answer from a tree that moved under a
// landing it made itself.
export { dropDerivers, holdDerivers }
