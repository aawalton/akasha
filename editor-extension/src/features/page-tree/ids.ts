/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The names this panel is known by in `package.json` and in the workbench.
 *
 * HELD APART FROM THE CODE THAT USES THEM SO THEY CAN BE CHECKED, as the Domains and Work
 * panels beside this one hold their own. A view id, a container id and a command id are matched by
 * string between the manifest and the extension, and NOTHING TYPECHECKS THAT MATCH. Get one wrong
 * and there is no build error and no exception: the panel is simply empty, or the refresh button is
 * simply absent. The manifest test beside this file reads the shipped manifest and holds it against
 * these, which it can only do because this module pulls in no `vscode` — the test runner has no
 * workbench to give it.
 */

/** The container in the secondary side bar, whose title is the word in the top strip. */
export const CONTAINER_ID = 'opsPages';

/** The one view inside that container. */
export const VIEW_ID = 'opsPageTree';

/** Refresh, contributed to the view's title bar. Collapse-all and expand-all are flags, not commands. */
export const REFRESH_COMMAND = 'opsPageTree.refreshNow';
