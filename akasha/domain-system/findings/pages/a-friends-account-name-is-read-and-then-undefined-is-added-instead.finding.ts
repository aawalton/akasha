import type { Finding } from "../finding.page-type.ts"

export const aFriendsAccountNameIsReadAndThenUndefinedIsAddedInstead = {
  id: "01a06193-53eb-7b9a-9cee-ba20437ab44e",
  pageTypeSlug: "finding",
  slug: "a-friends-account-name-is-read-and-then-undefined-is-added-instead",
  domainSlug: "domain/akasha-migration",
  claim:
    "The port-to-friend name list is given a friend's character name and then `undefined` where the friend's account name belongs. The account name is read on the line above and thrown away. The guild loop ten lines up adds both names, so the friend loop is the odd one out. This is in the temper source as much as in akasha, so it ships today rather than arriving with the migration.",
  evidence:
    "`akasha/temper/temper-housing-addon/housing-search/housing-search.module.code.ts`, in `createGuildAndFriendList`.\n\nThe guild loop adds two names per member:\n\n    portToFriend.AddNameToNameList(charName)\n    portToFriend.AddNameToNameList(name)\n\nThe friend loop adds a character name and then nothing:\n\n    portToFriend.AddNameToNameList(characterName)\n    portToFriend.AddNameToNameList(asUndefinedName(undefined))\n\n`temper/game-housing-addon/src/ptf/search.ts:373` opens that loop with `const [_displayName] = GetFriendInfo(friendIndex)`. `GetFriendInfo` returns the account display name first. So the value the second call wants is fetched, bound to a name marked unused, and never read.\n\nI removed that dead read at `7e71965ccf` because the Lua compiler refused it as a `LuaMultiReturn` used outside a destructuring assignment. That is a separate matter and changes nothing here: the read was already going nowhere, and `asUndefinedName(undefined)` was already what the list received.\n\nWhat I did not do is pass the display name, because that changes what the add-on does and the call is not mine to make. If the intent is what the guild loop shows, the fix is to bind the first return of `GetFriendInfo` and hand it to the second `AddNameToNameList` in place of the undefined.\n\nReading it the other way is possible: `asUndefinedName(undefined)` is explicit rather than accidental, and someone may have meant a friend to be reachable by character name alone. Nothing in the file says which.",
} as const satisfies Finding
