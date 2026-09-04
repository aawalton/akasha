import { BYTE_CEILING, LINE_CEILING } from "../searching/searching.module.code.ts"

export const SEARCH_HELP = `Every argument that is not \`--repo\` or \`--help\` is ripgrep's own, forwarded in the
order you wrote it. This changes what ripgrep STARTS from and takes none of its flags
away: the defaults below are given first and yours come after, so where the two
disagree yours is the one that holds.

WHAT IT SEARCHES IS A WHOLE REPOSITORY UNTIL YOU NAME A PATH. With no \`--repo\` and no
path it searches all of them, in the order they are listed below, one after another,
each root handed to ripgrep as the path to search. \`--repo\` narrows that to one.

A PATH YOU NAME IS SEARCHED INSTEAD OF THE REPOSITORIES rather than as well as them, and
it is the whole of what the search covers; name several and it covers those and nothing
else. Which arguments are paths is ripgrep's own rule: the first argument that is not a
flag or a flag's value is the pattern and every other one is a path, and under \`-e\` or
\`-f\` there is no pattern argument, so every one of them is a path. Naming a path and
\`--repo\` together is refused, because each says where to search and the two can
disagree.

RIPGREP RUNS FROM WHATEVER IT IS SEARCHING, so a glob is matched against the path inside
that place and \`-g 'tools/**'\` narrows to that directory, while what is printed stays
absolute. Narrow inside a repository with ripgrep's own \`-g\`/\`--glob\`, \`--iglob\` and
\`-t\`/\`--type\`. Every line printed carries an absolute path you can open without knowing
which directory this ran in, whether a repository or a path of your own was searched.

WHAT IT HANDS BACK IS BOUNDED. Printing stops at ${LINE_CEILING} lines or ${BYTE_CEILING} bytes, whichever
comes first. What you have when that happens is the front of the answer and not the
answer: narrow the pattern, the glob, the path or the repository and run it again.
Whatever the stop was reached before is named as something nothing looked at.

WHAT IT SAYS ABOUT THE ANSWER GOES TO STDERR, and the matching lines to stdout, so a run
piped somewhere else still tells you whether what you got was all of it.

A READER THAT STOPS READING ENDS THE SEARCH. Piping into \`head\` or quitting a pager
stops it where it is, with nothing left running and nothing to say about it.

NOTHING HERE IS RECORDED AS READ. A matching line is not the file it came out of, so a
change to a file you found this way is still refused until you have read it:
  akasha read --file-path <path>

Defaults it changes:
  --color never           Escape codes are noise to whatever reads this.
  --no-heading            Every line is read on its own rather than under a filename above it.
  --with-filename         So a line lifted out of the middle still says where it is from.
  --line-number           So the line can be opened at the place it matched.
  --smart-case            A pattern in lowercase throughout matches capitals too; one
                          with a capital in it is taken exactly as written. Give -s or
                          -i to settle that yourself.
  --max-columns 200       One long line cannot flood the answer.
  --max-columns-preview   A line past that shows its front rather than vanishing.`
