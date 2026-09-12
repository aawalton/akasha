import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const theChatterNameGeneratorWritesIntoAnAblatedAddonAndNothingReadsWhatItWrites = {
  id: "01a09593-a5bd-7619-a296-75a0534e1d09",
  type: "finding",
  slug: "the-chatter-name-generator-writes-into-an-ablated-addon-and-nothing-reads-what-it-writes",
  domain: "domain/temper",
  claim:
    "`akasha temper eso generate chatter-name` writes its registry into `temper/player-quests-addon`, the addon that was ablated when its akasha twin was proven, and no file anywhere imports what it writes. The three folders holding that one file are three of the forty `folder-matches-a-shape` refuses, which is how this was seen. The live reader builds the same map from the game globals rather than from a generated file, so the generated file looks like the last thing left of the old addon rather than a thing anyone wants.",
  evidence:
    '`commands/pages/temper/eso/generate/chatter-name/temper-eso-generate-chatter-name.command.code.ts:29` states `const OUT_REL = "temper/player-quests-addon/src/generated/chatter-names.generated.ts"`, and line 87 puts the registry text there.\\n\\nThat path is the only place in the checkout, outside its own uncommitted sidecars, where either `chatter-names.generated` or `player-quests-addon` is spelled. So nothing imports the file the command writes.\\n\\n`temper/player-quests-addon/` holds one file and nothing else: `src/generated/chatter-names.generated.ts`. The addon itself went in `9d668557723`, `Ablate the legacy quests addon now its akasha twin is proven`, and the generated file arrived after that in `aacec7fbaae`.\\n\\nThe twin is `temper/quests-addon/quests-chatter-names/`. Its page states `The map from code to name is built once and kept` and `A name the globals do not have is left out of the map`, so it reads the globals rather than a generated file.\\n\\nNot measured. The command was not run, so whether it still writes the same text was not established, and no reading was taken of what the file holds against what the module builds.',
} as const satisfies Finding
